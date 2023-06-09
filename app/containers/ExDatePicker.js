import React, { useMemo, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker'
import { date_str_format, DATE_STRING_DISPLAY_FORMAT } from '../utils/datetime'
import { COLOR_YELLOW, themes } from '../constants/colors'
import sharedStyles from '../views/Styles'
import { VectorIcon } from './VectorIcon'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    width: width - 48,
    alignSelf: 'center',
    borderWidth: 1,
    height: 56,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  label: {
    marginBottom: 4,
    fontSize: 14,
    ...sharedStyles.textSemibold,
  },
  content: {},
  selectContainer: {
    borderRadius: 8,
    paddingBottom: 8,
    width: '100%',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: { x: 2, y: 2 },
    shadowRadius: 4,
    elevation: 2,
    marginTop: 8,
    alignSelf: 'center',
    position: 'absolute',
    top: -height * 0.4,
    zIndex: 99999,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 1,
    height: 36,
  },
  selectContent: {
    flexDirection: 'row',
    height: 120,
  },
  headerContainer: {
    height: 36,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  doneText: {
    color: 'white',
    position: 'absolute',
    right: 4,
    top: 8,
    fontWeight: 'bold',
  },
  daySelect: {
    width: 80,
  },
  monthSelect: {
    flexGrow: 1,
    marginHorizontal: 8,
  },
  yearSelect: {
    width: 80,
  },
  selectHeader: {
    textAlign: 'center',
    fontSize: 16,
  },
  selectedStyle: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: COLOR_YELLOW,
  },
  selectStyle: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  selectValue: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  value: {
    marginRight: 12,
  },
  iconStyle: {
    position: 'absolute',
    right: 12,
  },
  textInput: {
    height: '100%',
    marginBottom: 3,
  },
  iconWrap: {
    flex: 1,
    justifyContent: 'center',
  },
  labelText: {
    fontFamily: 'Raleway',
    marginBottom: 5,
  },
})

const ExDatePicker = props => {
  const [show, setShow] = useState(false)
  const { label, containerStyle, theme, error, value: currentDate, placeholder } = props
  const inputBox = useRef(null)

  const calendarOption = {
    backgroundColor: themes[theme].backgroundColor,
    textHeaderColor: themes[theme].titleColor,
    textDefaultColor: themes[theme].textColor,
    selectedTextColor: themes[theme].titleColor,
    mainColor: COLOR_YELLOW,
    textSecondaryColor: themes[theme].subTextColor,
    borderColor: 'rgba(122, 146, 165, 0.1)',
  }

  const RightIcon = () => {
    return (
      <VectorIcon
        type={'Entypo'}
        name={show ? 'chevron-thin-up' : 'chevron-thin-right'}
        color={COLOR_YELLOW}
        size={12}
      />
    )
  }

  const selectedDate = useMemo(() => {
    if (currentDate) {
      const units = currentDate.split('/')
      return `${units[2]}-${units[0]}-${units[1]}`
    } else {
      return getFormatedDate(new Date(), 'DD/MM/YYYY')
    }
  }, [currentDate])

  return (
    <>
      {label && <Text style={[styles.labelText, { color: themes[theme].textColor }]}>{label}</Text>}
      <TouchableOpacity style={[styles.container, containerStyle]} onPress={() => setShow(true)}>
        <Text style={[styles.date, { color: currentDate ? themes[theme].activeTintColor : themes[theme].borderColor }]}>
          {currentDate ? date_str_format(currentDate, DATE_STRING_DISPLAY_FORMAT) : 'Select Date of Birth'}
        </Text>
        {show && (
          <View style={styles.selectContainer}>
            <DatePicker
              mode="calendar"
              style={[{ borderRadius: 10 }, theme === 'dark' && { borderWidth: 1, borderColor: 'white' }]}
              options={calendarOption}
              current={selectedDate}
              selected={selectedDate}
              onSelectedChange={date => {
                let units = date.split('/')
                const newDate = `${units[1]}/${units[2]}/${units[0]}`
                units = selectedDate.split(/-|\//)
                const selDate = `${units[1]}/${units[2]}/${units[0]}`
                if (newDate !== selDate) {
                  if (inputBox.current) {
                    inputBox.current.blur()
                  }
                  props.action({ value: newDate })
                  setShow(false)
                }
              }}
            />
          </View>
        )}
        {<RightIcon />}
      </TouchableOpacity>
    </>
  )
}

export default ExDatePicker
