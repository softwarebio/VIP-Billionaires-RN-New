import React, { useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  Image,
  ImageBackground,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import firestore from '@react-native-firebase/firestore'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { HEADER_BAR_END, HEADER_BAR_START, themes } from '../../constants/colors'
import StatusBar from '../../containers/StatusBar'
import SafeAreaView from '../../containers/SafeAreaView'
import { withTheme } from '../../theme'
import styles from './styles'
import { setUser as setUserAction } from '../../actions/login'
import images from '../../assets/images'
import firebaseSdk, {
  DB_ACTION_ADD,
  DB_ACTION_DELETE,
  NOTIFICATION_TYPE_FOLLOW,
} from '../../lib/firebaseSdk'
import ActivityIndicator from '../../containers/ActivityIndicator'
import sharedStyles from '../Styles'
import I18n from '../../i18n'
import { VectorIcon } from '../../containers/VectorIcon'
import { navigateToProfile } from '../../utils/const'

const FriendView = props => {
  const navigation = useNavigation()
  const [state, setState] = useState({
    refreshing: false,
    loading: true,
    updating: false,
  })
  const [data, setData] = useState([])

  const { theme, user, setUser } = props
  const { refreshing, updating, loading } = state

  useEffect(() => {
    navigation.setOptions({
      title: I18n.t('find_friend'),
    })
  }, [])

  useEffect(() => {
    getFriend()
  }, [user])

  const getFriend = useCallback(
    async _ => {
      const posts = []
      const users = []
      const friends = []
      const userSnaps = await firestore().collection(firebaseSdk.TBL_USER).get()
      const postSnaps = await firestore().collection(firebaseSdk.TBL_POST).get()
      postSnaps.forEach(p => posts.push({ id: p.id, userId: p.data().userId }))
      userSnaps.forEach(s => {
        const userInfo = { ...s.data(), id: s.id }
        if (
          userInfo.userId !== user.userId &&
          !user.blocked.includes(userInfo.userId)
        ) {
          const userPosts = posts.filter(p => p.userId === userInfo.userId)
          users.push({ ...userInfo, postCount: userPosts.length })
          if (user.followings.includes(userInfo.userId)) {
            friends.push({ ...userInfo, postCount: userPosts.length })
          }
        }
      })

      setData(friends)
      setState({ ...state, loading: false, refreshing: false, updating: false })
    })

  const onToggleFollow = (item, following) => {
    setState({ ...state, updating: true })
    firebaseSdk
      .updateFollows(
        user.id,
        item.id,
        following ? DB_ACTION_DELETE : DB_ACTION_ADD,
      )
      .then(({ myFollowings }) => {
        if (!following) {
          const activity = {
            type: NOTIFICATION_TYPE_FOLLOW,
            sender: user.userId,
            receiver: item.userId,
            content: '',
            text: item.text,
            postId: null,
            title: item.displayName,
            message: I18n.t('user_follows_you', {
              name: user.displayName,
            }),
            date: new Date(),
          }
          firebaseSdk.addActivity(activity, item.token).then(r => {})
        }
        setUser({ followings: myFollowings })
        setState({ ...state, updating: false })
      })
      .catch(err => {
        setState({ ...state, updating: false })
      })
  }

  const onPressItem = item => {
    navigateToProfile(navigation, user, item)
  }

  const renderItem = ({ item }) => {
    const following = user.followings.includes(item.userId)
    return (
      <TouchableOpacity
        onPress={() => onPressItem(item)}
        style={styles.itemContainer}>
        <View style={styles.itemHeader}>
          <Image
            source={item.avatar ? { uri: item.avatar } : images.default_avatar}
            style={styles.itemImage}
          />
          <View style={styles.itemContent}>
            <Text style={[styles.itemText, { color: themes[theme].activeTintColor }]}>{item.displayName}</Text>
            <Text
              style={[styles.itemPost, { color: themes[theme].infoText }]}>{`${item.postCount} ${I18n.t('Posts').toLowerCase()}`}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.actionContainer, { backgroundColor: following ? themes[theme].tintActive : themes[theme].searchboxBackground }]}
          onPress={() => onToggleFollow(item, following)}>
          <Text
            style={[styles.actionText, { color: following && theme === 'light' ? themes[theme].backgroundColor : themes[theme].activeTintColor }]}>
            {following ? I18n.t('Following').toLowerCase() : I18n.t('Follow').toLowerCase()}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  const renderFooter = () => {
    if (loading) {
      return <ActivityIndicator theme={theme} size={'large'} />
    }
    return null
  }

  const onRefresh = () => {
    setState({ ...state, refreshing: true })
    getFriend()
  }

  return (
    <View style={[sharedStyles.container, { backgroundColor: themes[theme].navbarBackground }]}>
      <SafeAreaView style={[sharedStyles.contentContainer, { backgroundColor: themes[theme].backgroundColor }]}>
        <StatusBar />
        <TouchableOpacity
          onPress={() => navigation.navigate('FindFriend')}
          style={[styles.searchBox, { backgroundColor: themes[theme].searchboxBackground }]}>
          <VectorIcon
            name="search"
            type="Ionicons"
            size={18}
            color={themes[theme].auxiliaryText}
          />
          <Text style={[styles.searchText, { color: themes[theme].auxiliaryText }]}>{`${I18n.t('Search')}...`}</Text>
        </TouchableOpacity>
        {updating && (
          <ActivityIndicator absolute theme={theme} size={'large'} />
        )}
        <View style={styles.container}>
          {data.length > 0 && (
            <FlatList
              style={{ height: '100%' }}
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item.userId}
              ListFooterComponent={renderFooter}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  tintColor={themes[theme].actionColor}
                />
              }
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  )
}

const mapStateToProps = state => ({
  user: state.login.user,
})

const mapDispatchToProps = dispatch => ({
  setUser: params => dispatch(setUserAction(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(FriendView))
