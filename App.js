import React from 'react';
import { Easing, BackHandler, WebView, TextInput, ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Button, Linking, Animated, Dimensions, Keyboard, UIManager } from 'react-native';
import { Font, SecureStore, LinearGradient } from 'expo';
import FontAwesome, { Icons } from "react-native-fontawesome";
import { FloatingTitleTextInputField } from './floating_title_text_input_field';

const { State: TextInputState } = TextInput;

const EditProfileForm = ({states, updateMasterState, change, cancel_change}) => {
	const { shift } = states;
	return (
		<View style={{flex:1}}>
			<Animated.View style={[styles.container, { transform: [{translateY: shift}] }]}>
			<View style={styles.loginRegisterCont}>
				<View style={styles.logImg}>
					<Image
						style={styles.loginRegisterImg}
					  source={require('./img/adult-beautiful-brunette-1089164.jpg')}
					/>
				</View>
				<View style={styles.loginRegisterMenu}>
					<View style={styles.border}>
						<View style={styles.error}>{states.errorReg ? <Text style={styles.regTextField}>Füllen Sie alle Felder aus</Text> : null}</View>
							<View style={{flexDirection: 'column'}}>
								<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
									<Image
										style={styles.fieldIcon}
										source={require('./img/icons8-email-50.png')}
									/>
									<FloatingTitleTextInputField attrName="edit_usr_email" title="E-Mail" value={states.edit_usr_email} updateMasterState = {updateMasterState} pwdField={false} />
								</View>
								<View style={styles.error}>{states.emailExists ? <Text style={styles.warningReg}>Diese E-Mail ist bereits registriert</Text> : null}</View>
							</View>	
						<View style={{flexDirection: 'column'}}>
							<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
								<Image
									style={styles.fieldIcon}
									source={require('./img/icons8-password-50.png')}
								/>
								<FloatingTitleTextInputField attrName="edit_usr_pwd_old" title="Altes Passwort" value={states.edit_usr_pwd_old} updateMasterState = {updateMasterState} pwdField={true} />
							</View>
							<View style={styles.error}>{states.changePwd ? <Text style={styles.warningReg}>Passwort ist falsch!</Text> : null}</View>
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
							<Image
								style={styles.fieldIcon}
								source={require('./img/icons8-password-50.png')}
							/>
							<FloatingTitleTextInputField attrName="edit_usr_pwd" title="Neues Passwort" value={states.edit_usr_pwd} updateMasterState = {updateMasterState} pwdField={true} />							
						</View>
						<View style={{flexDirection: 'column'}}>
							<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
								<Image
									style={styles.fieldIcon}
									source={require('./img/icons8-password-50.png')}
								/>
								<FloatingTitleTextInputField attrName="edit_usr_pwd_rep" title="Passwort wiederholen" value={states.edit_usr_pwd_rep} updateMasterState = {updateMasterState} pwdField={true} />
							</View>
							<View style={styles.error}>{states.passwordNotMatch ? <Text style={styles.warningReg}>Passwörter stimmen nicht überrein!</Text> : null}</View>
						</View>
						<View style={styles.button_login}>
							<View style={styles.button_log}>
								<TouchableOpacity
									onPress={() => {change()}}
								>
									<LinearGradient
										colors={['#FB7BA2', '#f2994a', '#f2c94c']}
										style={styles.gradient_btn}>
											<Text style={styles.btn}>Ändern</Text>
									</LinearGradient>
								</TouchableOpacity>
							</View>
							<View style={styles.button_reg}>
								<TouchableOpacity
									onPress={() => {cancel_change()}}
								>
								<LinearGradient
										colors={['#FB7BA2', '#f2994a', '#f2c94c']}
										style={styles.gradient_btn}>
											<Text style={styles.btn}>Abbrechen</Text>
								</LinearGradient>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</View>
			</Animated.View>
			<View style={states.loading ? styles.loading : styles.notLoading}>
				<Image 
					style={styles.loadingImg}
					source={require('./img/transparent-background-loading-3.gif')}
				/>
			</View>
		</View>);
}

const LoginForm = ({states, updateMasterState, login, register_form, recover_form}) => {
	return (
		<View style={{flex:1}}>
			<View style={styles.loginRegisterCont}>
				<View style={styles.logImg}>
					<Image
						style={styles.loginRegisterImg}
					  source={require('./img/adult-beautiful-brunette-1089164.jpg')}
					/>
				</View>
				<View style={styles.loginRegisterMenu}>
					<View style={styles.border}>
						<View style={styles.error}>{states.loginFailed ? <Text style={styles.regTextField}>Login ungültig</Text> : null}</View>
						<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
							<Image
								style={styles.fieldIcon}
								source={require('./img/icons8-name-50.png')}
							/>
							<FloatingTitleTextInputField attrName="usr" title="Benutzername" value={states.usr} updateMasterState = {updateMasterState} pwdField={false} />
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
							<Image
								style={styles.fieldIcon}
								source={require('./img/icons8-password-50.png')}
							/>
							<FloatingTitleTextInputField attrName="pwd" title="Passwort" value={states.pwd} updateMasterState = {updateMasterState} pwdField={true} />
						</View>
						<View style={styles.button_login}>
							<View style={styles.button_log}>
								<TouchableOpacity
									onPress={() => {login()}}
								>
									<LinearGradient
										colors={['#FB7BA2', '#f2994a', '#f2c94c']}
										style={styles.gradient_btn}>
											<Text style={styles.btn}>Anmelden</Text>
									</LinearGradient>
								</TouchableOpacity>
							</View>
							<View style={styles.textReg}>
								<Text style={{fontSize: 18, color: '#FFFFFF'}}>Nicht registiert?</Text>
								<TouchableOpacity
									onPress={() => {register_form()}}
								>
									<Text style={{fontSize: 18, color: '#999900'}}>Registrieren</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.textReg}>
								<Text style={{fontSize: 18, color: '#FFFFFF'}}>Passwort vergessen?</Text>
								<TouchableOpacity
									onPress={() => {recover_form()}}
								>
									<Text style={{fontSize: 18, color: '#999900'}}>Konto wiederherstellen</Text>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</View>
			<View style={states.loading ? styles.loading : styles.notLoading}>
			<Image 
				style={styles.loadingImg}
				source={require('./img/transparent-background-loading-3.gif')}
			/>
			</View>
		</View>);
}
	
const RegisterForm = ({states, updateMasterState, register, cancel_reg}) => {
	const { shift } = states;
	return (
		<View style={{flex:1}}>
			<Animated.View style={[styles.container, { transform: [{translateY: shift}] }]}>
			<View style={styles.loginRegisterCont}>
				<View style={styles.logImg}>
					<Image
						style={styles.loginRegisterImg}
					  source={require('./img/adult-beautiful-brunette-1089164.jpg')}
					/>
				</View>
				<View style={styles.loginRegisterMenu}>
					<View style={styles.border}>
						<View style={styles.error}>{states.errorReg ? <Text style={styles.regTextField}>Füllen Sie alle Felder aus</Text> : null}</View>
							<View style={{flexDirection: 'column'}}>
								<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
									<Image
										style={styles.fieldIcon}
										source={require('./img/icons8-name-50.png')}
									/>
									<FloatingTitleTextInputField attrName="reg_usr" title="Benutzername" value={states.reg_usr} updateMasterState = {updateMasterState} pwdField={false} />
								</View>
								<View style={styles.error}>{states.userExists ? <Text style={styles.warningReg}>Benutzer existiert bereits</Text> : null}</View>
							</View>	
						<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
							<Image
								style={styles.fieldIcon}
								source={require('./img/icons8-password-50.png')}
							/>
							<FloatingTitleTextInputField attrName="reg_pwd" title="Passwort" value={states.reg_pwd} updateMasterState = {updateMasterState} pwdField={true} />
						</View>
						<View style={{flexDirection: 'column'}}>
							<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
								<Image
									style={styles.fieldIcon}
									source={require('./img/icons8-password-50.png')}
								/>
								<FloatingTitleTextInputField attrName="reg_pwd_rep" title="Passwort wiederholen" value={states.reg_pwd_rep} updateMasterState = {updateMasterState} pwdField={true} />
							</View>
							<View style={styles.error}>{states.passwordNotMatch ? <Text style={styles.warningReg}>Passwörter stimmen nicht überrein!</Text> : null}</View>
						</View>
						<View style={{flexDirection: 'column'}}>
							<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
								<Image
									style={styles.fieldIcon}
									source={require('./img/icons8-email-50.png')}
								/>
								<FloatingTitleTextInputField attrName="reg_email" title="E-Mail" value={states.reg_email} updateMasterState = {updateMasterState} pwdField={false} />
							</View>
							<View style={styles.error}>{states.emailExists ? <Text style={styles.warningReg}>Dieses E-Mail ist bereits registriert</Text> : null}</View>
						</View>
						<View style={styles.button_login}>
							<View style={styles.button_log}>
								<TouchableOpacity
									onPress={() => {register()}}
								>
									<LinearGradient
										colors={['#FB7BA2', '#f2994a', '#f2c94c']}
										style={styles.gradient_btn}>
											<Text style={styles.btn}>Registrieren</Text>
									</LinearGradient>
								</TouchableOpacity>
							</View>
							<View style={styles.button_reg}>
								<TouchableOpacity
									onPress={() => {cancel_reg()}}
								>
									<LinearGradient
										colors={['#FB7BA2', '#f2994a', '#f2c94c']}
										style={styles.gradient_btn}>
											<Text style={styles.btn}>Abbrechen</Text>
									</LinearGradient>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</View>
			</Animated.View>
			<View style={states.loading ? styles.loading : styles.notLoading}>
				<Image 
					style={styles.loadingImg}
					source={require('./img/transparent-background-loading-3.gif')}
				/>
			</View>
		</View>);
}	
	
const RecoverPasswordForm = ({states, updateMasterState, recover, cancel_recover}) => {
	return (
		<View style={{flex:1}}>
			<View style={styles.loginRegisterCont}>
				<View style={styles.logImg}>
					<Image
						style={styles.loginRegisterImg}
					  source={require('./img/adult-beautiful-brunette-1089164.jpg')}
					/>
				</View>
				<View style={styles.loginRegisterMenu}>
					<View style={styles.border}>
						<View style={styles.error}>{states.recoverFailed ? <Text style={styles.regTextField}>Email nicht gefunden!</Text> : null}</View>
						<View style={{flexDirection: 'column'}}>
							<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
								<Image
									style={styles.fieldIcon}
									source={require('./img/icons8-email-50.png')}
								/>
								<FloatingTitleTextInputField attrName="rec_email" title="E-Mail" value={states.rec_email} updateMasterState = {updateMasterState} pwdField={false} />
							</View>
							<View style={styles.error}>{states.recoverSuccess ? <Text style={styles.warningReg}>Das neue Passwort wurde verschickt</Text> : null}</View>
						</View>
						<View style={styles.button_login}>
							<View style={styles.button_log}>
								<TouchableOpacity
									onPress={() => {recover()}}
								>
									<LinearGradient
										colors={['#FB7BA2', '#f2994a', '#f2c94c']}
										style={styles.gradient_btn}>
											<Text style={styles.btn}>Wiederherstellen</Text>
									</LinearGradient>
								</TouchableOpacity>
							</View>
							<View style={styles.button_reg}>
								<TouchableOpacity
									onPress={() => {cancel_recover()}}
								>
									<LinearGradient
										colors={['#FB7BA2', '#f2994a', '#f2c94c']}
										style={styles.gradient_btn}>
											<Text style={styles.btn}>Abbrechen</Text>
									</LinearGradient>
								</TouchableOpacity>
							</View>
						</View>
					</View>
				</View>
			</View>
			<View style={states.loading ? styles.loading : styles.notLoading}>
			<Image 
				style={styles.loadingImg}
				source={require('./img/transparent-background-loading-3.gif')}
			/>
			</View>
		</View>);
}	
	
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			page: 1, 
			amount: 0,
			showLoginRegisterMenu: true,
			showRegisterForm: false,
			usr: '',
			pwd: '',
			reg_usr: '',
			reg_pwd: '',
			reg_pwd_rep: '',
			reg_email: '',
			logged: false,
			errorReg: false,
			loginFailed: false,
			showMenu: false,
			loading: false,
			userExists: false,
			emailExists: false,
			passwordNotMatch: false,
			shift: new Animated.Value(0),
			webView: '',
			webViewTitle: '',
			typeLocation: 'main',
			edit_usr_pwd_old: '',
			edit_usr_pwd: '',
			edit_usr_pwd_rep: '',
			rec_email: '',
		};
		
		this.animatedValue = new Animated.Value(0);
		
		this.renderrListItem = this.renderListItem.bind(this);
		this.loadDataList = this.loadDataList.bind(this);
		this.addPage = this.addPage.bind(this);
		this.minusPage = this.minusPage.bind(this);
		this.onPressLearnMore = this.onPressLearnMore.bind(this);
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.backMain = this.backMain.bind(this);
		this.count = 0;
		this.loaded = false;
	}
	
	async componentWillMount() {
		await Font.loadAsync({
			'awesome': require('./assets/fonts/fontawesome-webfont.ttf'),
		});
		this.loaded = true;
		this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow);
		this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide);
	}
	
	componentDidMount() {
		fetch('https://meningococcal-distr.000webhostapp.com/total.php')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					amount: responseJson[0]['amount']
				})
		});
		Promise.all([
			SecureStore.getItemAsync('usr'),
			SecureStore.getItemAsync('pwd')
		]).then((responses) => {
			if(responses[0] != null && responses[1] != null) {
				this.setState({
					usr: responses[0],
					pwd: responses[1],
					showLoginRegisterMenu: false,
				}, function() {
					this.login();
				});	
			}
		});
		BackHandler.addEventListener('hardwareBackPress', this.backHandler);
		this.animate();
	}
	
	componentWillUnmount() {
		this.keyboardDidShowSub.remove();
		this.keyboardDidHideSub.remove();
		BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
	}
	
	animate () {
		this.animatedValue.setValue(0);
		Animated.timing(
			this.animatedValue,
			{
				toValue: 1,
				duration: 1500,
				easing: Easing.linear
			}
		).start();
	}
	
	backHandler = () => {
		if(this.state.webView == '') {
			return;
		}
		this.state.webview_ref.current.goBack();
		if(this.state.canGoBack == '') {
			this.setState({
				webView: '',
			});
		}
		return true;
	}
	
	backMain = () => {
		this.setState({
			webView: '',
		});
	}
	
	loadDataList = (type) => {
		this.setState({
			loading: true,
		});
		return fetch('https://meningococcal-distr.000webhostapp.com/lists.php?page='+this.state.page+'&type='+type+'&usr_id='+this.state.usr_id)
			.then((response) => response.json())
			.then((responseJson) => {
				if(responseJson != false) {
					this.setState({
						isLoading: false,
						dataSource: responseJson,
						count: 0,
						loading: false,
					});
				} else {
					this.setState({
						isLoading: false,
						dataSource: '',
						count: 0,
						loading: false,
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}

	onPressLearnMore = (articles_link, articles_title) => {
		this.setState({
			webView: articles_link,
			webview_ref: React.createRef(),
			webViewTitle: articles_title
		});
	}
	
	async favorite (usr_id, articles_id, favorites_id) {
		if(favorites_id == null) {
			await fetch('https://meningococcal-distr.000webhostapp.com/favorites.php?usr='+usr_id+'&article='+articles_id)
				.then((response) => response.json())
				.then((responseJson) => {
				});
		} else {
			await fetch('https://meningococcal-distr.000webhostapp.com/delete_favorites.php?fav_id='+favorites_id)
				.then((response) => response.json())
				.then((responseJson) => {
				});
		}
		this.loadDataList(this.state.typeLocation);
	}
	
	renderListItem = (item) => {
		this.count = this.count + 1;
		return (
			<View>
				<View style={this.count % 2 == 0 ? styles.title_cont_odd : styles.title_cont_even}>
					<View>
						<Text style={this.count % 2 == 0 ? styles.title_odd : styles.title_even}>{item.item.articles_title} </Text>
					</View>
					<View>
						<Text style={styles.title_date}>{item.item.articles_date}</Text>
					</View>
				</View>
				<View style={styles.content_cont}>
					<Text style={this.count % 2 == 0 ? styles.content_odd : styles.content_even}>{item.item.articles_text}</Text>
					<View style={styles.button_cont}>
						<Button title='Weiter' onPress={() => this.onPressLearnMore(item.item.articles_link, item.item.articles_title)} color='#999900' style={styles.button_more} />
						<View style={styles.heart}>
							<TouchableOpacity
								onPress={() => this.favorite(this.state.usr_id, item.item.articles_id, item.item.favorites_id)}
							>
								<Image
								source={item.item.favorites_id == null ? require('./img/icons8-bookmark-64_delete.png') : require('./img/icons8-bookmark-64.png')}
							/>
							</TouchableOpacity>
							
						</View>
					</View>
				</View>
			</View>
		);
	}
	
	keyExtractor = (item, index) => item.articles_id;
	
	addPage = () => {
		if(this.state.page*10 < this.state.amount) {
			this.setState({
				page: this.state.page+1
			}, () => {
				this.loadDataList(this.state.typeLocation);
				this.refs._scrollView.scrollTo({x: 0, y: 0, animated: 'true'});
			});
		}
	}
	
	minusPage = () => {
		if(this.state.page > 1) {
			this.setState({
				page: this.state.page-1
			}, () => {
				this.loadDataList(this.state.typeLocation);
				this.refs._scrollView.scrollTo({x: 0, y: 0, animated: 'true'});
			});
		}
	}
	
	login = () => {
		this.setState({
			loading: true,
		});
		fetch('https://meningococcal-distr.000webhostapp.com/login.php?usr='+this.state.usr+'&pwd='+this.state.pwd)
			.then((response) => response.json())
			.then((responseJson) => {
				if(responseJson != false) {
					this.setState({
						showLoginRegisterMenu: false,
						showRegisterForm: false,
						loading: false,
						usr_id: responseJson['usr_id'],
						email: responseJson['usr_email'],
					}, function() {
						SecureStore.setItemAsync('usr', this.state.usr);
						SecureStore.setItemAsync('pwd', this.state.pwd);
						this.loadDataList(this.state.typeLocation);
					});
				} else {
					Promise.all([
						SecureStore.getItemAsync('usr'),
						SecureStore.getItemAsync('pwd')
					]).then((responses) => {
						if(responses[0] != null && responses[1] != null) {
							SecureStore.deleteItemAsync('usr');
							SecureStore.deleteItemAsync('pwd');
							return;
						}
					});
					this.setState({
						loginFailed: true,
						loading: false,
						showLoginRegisterMenu: true,
						usr: '',
						pwd: '',
					});
				}
			})
			.catch((error) => {
				console.error(error);
			});
	}
	
	register_form = () => {
		this.setState({
			showRegisterForm: true,
			showLoginRegisterMenu: false,
			loginFailed: false,
			usr: '',
			pwd: '',
			userExists: false,
			emailExists: false,
		});
	}
	
	register = () => {
		this.setState({
			loading: true,
		});
		if(this.state.userExists ==  false && this.state.emailExists == false) {
			if(this.state.reg_usr == '' || this.state.reg_pwd == '' || this.state.reg_pwd_rep == '' || this.state.reg_email == '') {
				this.setState({
					errorReg: true,
					loading: false,
				});
				return;
			}
			if(this.state.passwordNotMatch == '') {
				fetch('https://meningococcal-distr.000webhostapp.com/register.php?usr='+this.state.reg_usr+'&pwd='+this.state.reg_pwd+'&email='+this.state.reg_email)
					.then((response) => response.json())
					.then((responseJson) => {
						this.setState({
							showRegisterForm: false,
							showLoginRegisterMenu: true,
							loading: false,
							reg_usr: '',
							reg_pwd: '',
							reg_pwd_rep: '',
							reg_email: '',
						});
					});
			}
		}
	}
	
	cancel_reg = () => {
		this.setState({
			showRegisterForm: false,
			showLoginRegisterMenu: true,
			errorReg: false,
		});
	}

	showMenu = () => {
		this.animate();
		this.setState({
			showMenu: !this.state.showMenu,
		}, function() {
			if(this.state.showMenu == false) {
				Animated.timing(
					this.animatedValue
				).stop();
				this.animatedValue.resetAnimation();
			}
		});
	}
	
	logout = () => {
		SecureStore.deleteItemAsync('usr');
		SecureStore.deleteItemAsync('pwd');
		this.setState({
			showRegisterForm: false,
			showLoginRegisterMenu: true,
			usr: '',
			pwd: '',
			showMenu: false,
			editProfile: false,
			typeLocation: 'main',
		});
	}
	
	handleKeyboardDidShow = (event) => {
		const { height: windowHeight } = Dimensions.get('window');
		const keyboardHeight = event.endCoordinates.height;
		const currentlyFocusedField = TextInputState.currentlyFocusedField();
		UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
			const fieldHeight = height;
			const fieldTop = pageY;
			const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight);
			if (gap >= 0) {
				return;
			}
			Animated.timing(
				this.state.shift,
				{
				  toValue: gap,
				  duration: 1000,
				  useNativeDriver: true,
				}
			).start();
		});
	}
	  
	handleKeyboardDidHide = () => {
		Animated.timing(
			this.state.shift,
			{
				toValue: 0,
				duration: 1000,
				useNativeDriver: true,
			}
		).start();
	}
	
	pressFavorites = () => {
		fetch('https://meningococcal-distr.000webhostapp.com/total_fav.php?usr_id='+this.state.usr_id)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					amount: responseJson[0]['amount'],
				})
		});
		this.setState({
			typeLocation: 'favorites',
			page: 1,
		}, function() {
			this.loadDataList(this.state.typeLocation);
		});
	}
	
	pressEditProfile = () => {
		this.setState({
			editProfile: true,
			edit_usr_email: this.state.email
		});
	}
	
	cancel_change = () => {
		this.setState({
			editProfile: false,
			changePwd: false,
		});
	}
	
	pressHome = () => {
		fetch('https://meningococcal-distr.000webhostapp.com/total.php')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					amount: responseJson[0]['amount'],
					typeLocation: 'main',
					page: 1,
				}, function() {
					this.loadDataList(this.state.typeLocation);
				})
		});
	}
	
	change = () => {
		this.setState({
			loading: true,
			changePwd: false,
		});
		if(this.state.edit_usr_pwd_old == this.state.pwd) {
			if(this.state.edit_usr_pwd != '' && this.state.edit_usr_pwd_rep != '' && this.state.passwordNotMatch == false && this.state.emailExists == false) {
				fetch('https://meningococcal-distr.000webhostapp.com/edit_profile.php?id='+this.state.usr_id+'&pwd='+this.state.edit_usr_pwd+'&email='+this.state.edit_usr_email)
					.then((response) => response.json())
					.then((responseJson) => {
					});
				this.setState({
					email: this.state.edit_usr_email,
					edit_usr_pwd_old: '',
					edit_usr_pwd: '',
					edit_usr_pwd_rep: '',
					loading: false,
				});
				this.logout();
			} else if(this.state.emailExists == false && this.state.edit_usr_pwd == '' && this.state.edit_usr_pwd_rep == '') {
				fetch('https://meningococcal-distr.000webhostapp.com/edit_profile.php?id='+this.state.usr_id+'&pwd='+this.state.edit_usr_pwd_old+'&email='+this.state.edit_usr_email)
					.then((response) => response.json())
					.then((responseJson) => {
					});
				this.setState({
					email: this.state.edit_usr_email,
					edit_usr_pwd_old: '',
					loading: false,
				});
			}
		} else {
			this.setState({
				changePwd: true,
				loading: false,
			});
		}
	}
	
	recover_form = () => {
		this.setState({
			showLoginRegisterMenu: false,
			showRecoverForm: true,
		});
	}
	
	cancel_recover = () => {
		this.setState({
			showRecoverForm: false,
			showLoginRegisterMenu: true,
			recoverSuccess: false,
			rec_email: '',
		});
	}
	
	recover_pwd = () => {
		this.setState({
			loading: true,
		});
		fetch('https://meningococcal-distr.000webhostapp.com/recover.php?email='+this.state.rec_email)
			.then((response) => response.json())
			.then((responseJson) => {
				if(responseJson == false) {
					this.setState({
						recoverFailed: true,
						recoverSuccess: false,
					});
				} else {
					this.setState({
						recoverFailed: false,
						recoverSuccess: true,
					});
				}
			});
		this.setState({
			loading: false,
		});
	}
	
	_updateMasterState = (attrName, value) => {
		if(attrName == 'reg_usr') {
			fetch('https://meningococcal-distr.000webhostapp.com/check_username.php?usr='+value)
				.then((response) => response.json())
				.then((responseJson) => {
					if(responseJson == true) {
						this.setState({
							userExists: true,
						});
						return;
					} else {
						this.setState({
							userExists: false,
						});
					}
			}).catch((error) => {
				console.error(error);
			});
		} else if(attrName == 'reg_email' || (this.state.email != this.state.edit_usr_email)) {
			fetch('https://meningococcal-distr.000webhostapp.com/check_email.php?email='+value)
				.then((response) => response.json())
				.then((responseJson) => {
					if(responseJson == true) {
						this.setState({
							emailExists: true,
						});
						return;
					} else {
						this.setState({
							emailExists: false,
						});
					}
			}).catch((error) => {
				console.error(error);
			});
		} else if(attrName == 'reg_pwd' || attrName == 'reg_pwd_rep' || attrName == 'edit_usr_pwd' || attrName == 'edit_usr_pwd_rep') {
			if((this.state.reg_pwd == value || this.state.reg_pwd_rep == value) || (this.state.edit_usr_pwd == value || this.state.edit_usr_pwd_rep == value)) {
				this.setState({
					passwordNotMatch: false,
				});
			} else {
				this.setState({
					passwordNotMatch: true,
				});
			}
		} else if(attrName == 'edit_usr_pwd_old') {
			this.setState({
				changePwd: false,
			});
		}
		this.setState({ [attrName]: value });
	}
	
	render() {
		if(this.state.webView != '') {
			return(
				<View style={styles.webviewWrap}>
					<View style={styles.webviewHeader}>
						<View>
							<TouchableOpacity
								onPress={this.backMain}
								style={styles.webviewBtnWrap}
							>
								<Text style={styles.webviewBtn}>Zürück</Text>
							</TouchableOpacity>
						</View>
						<View style={styles.webviewTitleWrap}>
							<Text style={styles.webviewTitle}>{this.state.webViewTitle}</Text>
						</View>
					</View>
					<WebView
						source={{uri: this.state.webView}}
						ref={this.state.webview_ref}
						style={{marginTop: 74}}
						onNavigationStateChange={(navState) => { this.state.canGoBack = navState.canGoBack; }}
					/>
				</View>);
			
		}
		if(this.loaded == false) {
			return <Image
						style={styles.headerImg}
						source={require('./img/ounq1mw5kdxy.gif')}
					/>
		}
		if(this.state.showLoginRegisterMenu == true) {
			return (<LoginForm 
						states={this.state} 
						updateMasterState={this._updateMasterState}
						login={this.login} 
						register_form={this.register_form}
						recover_form={this.recover_form}/>);
		}
		if(this.state.showRecoverForm == true) {
			return (<RecoverPasswordForm 
						states={this.state} 
						updateMasterState={this._updateMasterState}
						recover={this.recover_pwd}
						cancel_recover={this.cancel_recover}/>);
		}
		if(this.state.showRegisterForm == true) {
			return (<RegisterForm 
						states={this.state}
						updateMasterState={this._updateMasterState}
						register={this.register}
						cancel_reg={this.cancel_reg}/>);
		}
		if(this.state.editProfile == true) {
			return (<EditProfileForm 
						states={this.state} 
						updateMasterState={this._updateMasterState}
						change={this.change}
						cancel_change={this.cancel_change}
					/>);
		}
		if(this.state.showMenu == true) {
			var movingMargin = this.animatedValue.interpolate({
				inputRange: [0, 1],
				outputRange: [-300, 0]
			});
		}
		return (<View style={styles.main}>
					<ScrollView style={styles.wrapper} stickyHeaderIndices={[1]} ref="_scrollView">
						<View 
							style={styles.header} 
							onLayout={(event) => {
							  var {x, y, width, height} = event.nativeEvent.layout;
							  var heightHeader = height;
							  this.setState({heightHeader: height});
							}}>
							<Image
								style={styles.headerImg}
							  source={require('./img/sea-beach-holiday-vacation.jpg')}
							/>
							<View style={styles.bars}>
								<TouchableOpacity onPress={this.showMenu}>
									<Text style={styles.fonts}>
										{Icons.bars }
									</Text>
								</TouchableOpacity>
							</View>
							<Animated.View style={this.state.showMenu == true ? [styles.userMenuShow, {height: this.state.heightHeader, marginLeft: movingMargin}] : styles.userMenuHide}>
								<View style={styles.menuItem}>
									<View style={styles.userMenuImg}>
										<Image
											style={styles.menuItemStyleImg}
											source={require('./img/icons8-user-64.png')}
										/>
									</View>
									<View style={styles.userMenuTitle}>
										<Text style={styles.menuItemStyle} onPress={this.pressEditProfile}>
											Profil
										</Text>
									</View>
								</View>
								<View style={styles.menuItem}>
									<View style={styles.userMenuImg}>
										<Image
											style={styles.menuItemStyleImg}
											source={require('./img/icons8-home-64.png')}
										/>
									</View>
									<View style={styles.userMenuTitle}>
										<Text style={styles.menuItemStyle} onPress={this.pressHome}>
											Home
										</Text>
									</View>
								</View>
								<View style={styles.menuItem}>
									<View style={styles.userMenuImg}>
										<Image
											style={styles.menuItemStyleImg}
											source={require('./img/icons8-star-64.png')}
										/>
									</View>
									<View style={styles.userMenuTitle}>
										<Text style={styles.menuItemStyle} onPress={this.pressFavorites}>
											Favoriten
										</Text>
									</View>
								</View>
								<View style={styles.menuItem}>
									<View style={styles.userMenuImg}>
										<Image
											style={styles.menuItemStyleImg}
											source={require('./img/icons8-exit-64.png')}
										/>
									</View>
									<View style={styles.userMenuTitle}>
										<Text style={styles.menuItemStyle} onPress={this.logout}>
											Ausloggen
										</Text>
									</View>
								</View>
							</Animated.View>
						</View>
						<View style={styles.pagination}>
							<View style={styles.menu}>
								<TouchableOpacity onPress={this.minusPage}><Text style={styles.fonts}>{Icons.chevronLeft}</Text></TouchableOpacity><Text>'  '</Text><TouchableOpacity onPress={this.addPage}><Text style={styles.fonts}>{Icons.chevronRight}</Text></TouchableOpacity>
							</View>
						</View>
						<FlatList
							data={this.state.dataSource}
							keyExtractor={this.keyExtractor}
							renderItem={this.renderListItem}
						  />
					</ScrollView>
					<View style={this.state.loading ? styles.loading : styles.notLoading}>
						<Image 
							style={styles.loadingImg}
							source={require('./img/transparent-background-loading-3.gif')}
						/>
					</View>
				</View>);
	}
}

const styles = StyleSheet.create({
	main: {
		backgroundColor: '#0e1111',
		flex: 1,
	},
	
	container: {
		flex: 1,
		height: '100%',
		justifyContent: 'space-around',
		left: 0,
		position: 'absolute',
		top: 0,
		width: '100%'
	},
	
	wrapper: {
		backgroundColor: '#0e1111',
		marginTop: 20,
	},
  
	header: {
		flexDirection: 'row',
	},
  
	headerImg: {
		flex: 1,
		aspectRatio: 1.5, 
		resizeMode: 'contain'
	},
	
	bars: {
		position: 'absolute',
		right: 20,
		top: 100,
	},
	
	userMenuShow: {
		position: 'absolute',
		top: 0,
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start',
		width: 200,
		backgroundColor: '#0e1111',
		paddingLeft: 25,
		paddingRight: 25,
		
	},
	
	userMenuHide: {
		display: 'none',
	},
	
	userMenuImg: {
		flex: 1.5,
		justifyContent: 'center',
		height: 52.5,
		alignItems: 'center',
	},
	
	userMenuTitle: {
		flex: 3,
		justifyContent: 'center',
		height: 52.5,
		alignItems: 'flex-start',
	},
	
	menuItemStyle: {
		fontSize: 20,
		color: '#FFFFFF',
	},
	
	menuItemStyleImg: {
		resizeMode: 'contain',
		height: 40,
	},
	
	menuItem: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'flex-start',
		flexDirection: 'row',
		height: 62.5,
	},
	
	pagination: {
		flexDirection: 'row',
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: '#0e1111',
		zIndex: 9999,
	},
  
	menu: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
  
	fonts: {
		fontSize: 40,
		fontFamily: 'awesome',
		color: '#FFFFFF'
	},
	
	title_cont_odd: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#414a4c',
	},
	
	title_cont_even: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#232b2b',
	},
  
	title_odd: {
		backgroundColor: '#414a4c',
		fontSize: 20,
		padding: 10,
		color: '#ffffff',
		fontWeight: 'bold'
	},
  
  	title_even: {
		backgroundColor: '#232b2b',
		fontSize: 20,
		padding: 10,
		color: '#ffffff',
		fontWeight: 'bold'
	},
	
	title_date: {
		color: '#ffffff',
		fontSize: 15,
		padding: 10,		
	},
	
	content_cont: {
		flexDirection: 'row',
		flex: 1,
	},
	
	content_odd: {
		backgroundColor: '#414a4c',
		padding: 10,
		fontSize: 15,
		color: '#ffffff',
		flex: 1,
	},
	
	content_even: {
		backgroundColor: '#232b2b',
		padding: 10,
		fontSize: 15,
		color: '#ffffff',
		flex: 1,
	},
	
	button_cont: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#FFFFFF',
	},
	
	button_more: {
		height: 60,
	},
	
	loginRegisterCont: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
	
	loginRegisterMenu: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'stretch',
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	
	loginRegisterImg: {
		flex: 1, 
		height: 250,
		flexDirection: 'column', 
		resizeMode: 'contain'
	},
	
	textField: {
		color: '#FFFFFF',
		padding: 20,
	},
	
	regTextField: {
		color: '#FF5722',
		padding: 10,
	},
	
	field: {
		backgroundColor: 'rgba(255, 255, 255, 0.5)',
		width: 300,
		borderRadius: 20,
		height: 50,
		borderWidth: 2,
		borderColor: '#D4AF37',
		fontSize: 20,
		paddingLeft: 60,
		paddingRight: 10,
	},
	
	button_login: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	
	gradient_btn: {
		height: 50,
		borderRadius: 20,
		width: 200,
		marginTop: 50,
	},
	
	btn: {
		fontSize: 20,
		padding: 10,
		justifyContent: 'center',
		color: '#FFFFFF',
		textAlign: 'center',
		backgroundColor: 'transparent',
	},
	
	logImg: {
		justifyContent:'space-around',
	},
	
	loading: {
		position: 'absolute',
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		width: '100%',
		height: '100%',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
		opacity: 1,
	},
	
	notLoading: {
		display: 'none',
	},
	
	loadingImg: {
		top: 0,
		right: 0,
		left: 0,
		bottom: 0,
		width: 100,
		height: 100,
	},
	
	fieldIcon: {
		position: 'absolute',
		left: 7,
		height: 35, 
		resizeMode: 'contain',
		zIndex: 10,
	},
	
	textReg: {
		marginTop: 30,
		fontSize: 30,
		alignItems: 'center',
	},
	
	warningReg: {
		textAlign: 'center',
		alignItems: 'center',
		color: '#FF5722'
	},
	
	border: {
		borderWidth: 2,
		padding: 20,
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	
	error: {
		alignItems: 'center',
	},
	
	webviewWrap: {
		justifyContent: 'center',
		flexDirection: 'column',
		flex: 1,
	},
	
	webviewHeader: {
		position: 'absolute', 
		top: 24,
		height: 50,
		backgroundColor: '#000000',
		zIndex: 9999999,
		flexDirection: 'row',	
		width: '100%',	
	},
	
	webviewBtnWrap: {
		backgroundColor: '#000000',
		width: 120,
		height: 50,
		justifyContent: 'center',
	},
	
	webviewBtn: {
		left: 20,
		height: 30,
		borderRadius: 20,
		backgroundColor: '#999900',
		fontSize: 20,
		justifyContent: 'center',
		color: '#FFFFFF',
		width: 100,
		textAlign: 'center',
	},
	
	webviewTitleWrap: {
		backgroundColor: '#000000',
		width: Dimensions.get('window').width-120,
		height: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
	
	webviewTitle: {
		color: '#FFFFFF',
	},
	
	heart: {
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		flex: 1,
	}
});