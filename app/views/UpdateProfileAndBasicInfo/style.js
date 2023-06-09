import { Dimensions, StyleSheet } from 'react-native';
import { themes } from '../../constants/colors';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {},
  logo: {
    height: 82,
    resizeMode: 'contain',
  },
  welcomeText: {
    marginTop: 44,
    fontSize: 25,
    lineHeight: 25,
    fontFamily: 'Raleway',
    fontWeight: '600',
  },
  completeStepsText: {
    color: '#4A4A4A',
    fontFamily: 'Raleway',
    fontWeight: '400',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 9,
  },
  uploadButtonsContainer: {
    width: width * 0.9,
    alignSelf: 'center',
  },
  optionButton: {
    width: '99%',
    height: 54,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 8,
    marginVertical: 5,
    backgroundColor: '#B1B1B11A',
    opacity: 5,
    alignSelf: 'center',
  },
  uploadNowText: {
    fontSize: 12,
    fontWeight: '700',
    position: 'absolute',
    right: 10,
  },
  uploadProfileImageText: {
    marginLeft: 10,
    fontSize: 14,
    fontFamily: 'Hind Vadodara',
    fontWeight: '500',
  },
  addExperienceContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 15,
  },
  addExperienceBtn: {
    width: '99%',
    height: 54,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 8,
    marginVertical: 5,
    backgroundColor: '#B1B1B11A',
    opacity: 5,
    alignSelf: 'center',
  },
  addExperienceTxt: {
    alignSelf: 'center',
  },
  updateExperienceTxt: {
    fontFamily: 'Raleway',
    color: '#858585',
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 15,
    marginLeft: 10,
  },
  othersText: {
    fontFamily: 'Raleway',
    color: themes.light.titleColor,
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 15,
    marginLeft: 10,
  },
  basicSubscriptionBtn: {
    width: '99%',
    height: 54,
    borderRadius: 6,
    flexDirection: 'row',
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: '#B1B1B11A',
    opacity: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  othersContainer: {
    width: width * 0.9,
    alignSelf: 'center',
    marginTop: 15,
  },
  inviteNowBtn: {
    width: '99%',
    height: 54,
    borderRadius: 6,
    paddingLeft: 10,
    marginVertical: 5,
    backgroundColor: '#B1B1B11A',
    opacity: 5,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  reward_badge: {
    resizeMode: 'contain',
    width: 40,
    height: 43.22,
  },
  fast_email_sending: {
    resizeMode: 'contain',
    width: 40,
    height: 43.22,
  },
  basicSubscriptionAndUpgradePlanContainer: {
    marginLeft: 14,
  },
  basicSubscriptionText: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 16,
  },
  upgradePlanText: {
    fontFamily: 'Raleway',
    fontSize: 10,
  },
  inviteTitle: {
    fontFamily: 'Hind Vadodara',
    fontWeight: '600',
    fontSize: 16,
  },
  inviteDescription: {
    fontFamily: 'Raleway',
    fontSize: 10,
  },
  bottomSheet: {
    paddingHorizontal: 24,
    paddingVertical: 13,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
  },
  termsAndConditions: {
    color: '#DBAA2E',
    fontSize: 14,
  },
  privacyPolicy: {
    color: '#DBAA2E',
  },
  termsAndConditionsPrivacyPolicy: {
    fontFamily: 'Raleway',
    flexShrink: 1,
    fontSize: 14,
    lineHeight: 20,
    color: themes.light.textColor,
  },
  headerContainer: {
    marginVertical: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBtn: {
    height: 45,
    alignSelf: 'center',
  },
  radioButton: {
    marginRight: 10,
  },
  radioButtonAndText: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  updateExperienceText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 10,
    fontFamily: 'Raleway',
    lineHeight: 15,
    marginVertical: 15,
    color: themes.light.titleColor,
  },
});

export default styles;
