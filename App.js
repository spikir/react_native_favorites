import React from 'react';
import { BackHandler, WebView, TextInput, ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Button, Linking, Animated, Dimensions, Keyboard, UIManager } from 'react-native';
import { Font, SecureStore } from 'expo';
import FontAwesome, { Icons } from "react-native-fontawesome";

const { State: TextInputState } = TextInput;

const LoginForm = ({states, handleChange, login, register_form}) => {
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
							<TextInput placeholder="Benutzername" style={styles.field} value={states.usr} onChange={(event) => {handleChange(event, 'usr')}}></TextInput>
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
							<Image
								style={styles.fieldIcon}
								source={require('./img/icons8-password-50.png')}
							/>
							<TextInput placeholder="Passwort" style={styles.field} secureTextEntry={true} value={states.pwd} onChange={(event) => {handleChange(event, 'pwd')}}></TextInput>
						</View>
						<View style={styles.button_login}>
							<View style={styles.button_log}>
								<TouchableOpacity
									onPress={() => {login()}}
								>
									<Text style={styles.btn}>Anmelden</Text>
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
									onPress={() => {register_form()}}
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
	
const RegisterForm = ({states, handleChange, register, cancel_reg}) => {
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
									<TextInput placeholder="Benutzername" style={styles.field} value={states.reg_usr} onChange={(event) => {handleChange(event, 'reg_usr')}}></TextInput>
								</View>
								<View style={styles.error}>{states.userExists ? <Text style={styles.warningReg}>Benutzer existiert bereits</Text> : null}</View>
							</View>	
						<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
							<Image
								style={styles.fieldIcon}
								source={require('./img/icons8-password-50.png')}
							/>
							<TextInput placeholder="Passwort" style={styles.field} secureTextEntry={true} value={states.reg_pwd} onChange={(event) => {handleChange(event, 'reg_pwd')}}></TextInput>
						</View>
						<View style={{flexDirection: 'column'}}>
							<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
								<Image
									style={styles.fieldIcon}
									source={require('./img/icons8-password-50.png')}
								/>
								<TextInput placeholder="Passwort wiederholen" style={styles.field} secureTextEntry={true} value={states.reg_pwd_rep} onChange={(event) => {handleChange(event, 'reg_pwd_rep')}}></TextInput>
							</View>
							<View style={styles.error}>{states.passwordNotMatch ? <Text style={styles.warningReg}>Passwörter stimmen nicht überrein!</Text> : null}</View>
						</View>
						<View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10}}>
							<Image
								style={styles.fieldIcon}
								source={require('./img/icons8-email-50.png')}
							/>
							<TextInput placeholder="E-Mail" style={styles.field} value={states.reg_email} onChange={(event) => {handleChange(event, 'reg_email')}}></TextInput>
						</View>
						<View style={styles.button_login}>
							<View style={styles.button_log}>
								<TouchableOpacity
									onPress={() => {register()}}
								>
									<Text style={styles.btn}>Registrieren</Text>
								</TouchableOpacity>
							</View>
							<View style={styles.button_reg}>
								<TouchableOpacity
									onPress={() => {cancel_reg()}}
								>
									<Text style={styles.btn}>Abbrechen</Text>
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
			passwordNotMatch: false,
			shift: new Animated.Value(0),
			webView: '',
			webViewTitle: '',
		};
		
		this.renderrListItem = this.renderListItem.bind(this);
		this.loadDataList = this.loadDataList.bind(this);
		this.addPage = this.addPage.bind(this);
		this.minusPage = this.minusPage.bind(this);
		this.onPressLearnMore = this.onPressLearnMore.bind(this);
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.handleChange = this.handleChange.bind(this);
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
				}, function() {
					this.login();
				});	
			}
		});
		this.loadDataList();
		BackHandler.addEventListener('hardwareBackPress', this.backHandler);
	}
	
	componentWillUnmount() {
		this.keyboardDidShowSub.remove();
		this.keyboardDidHideSub.remove();
		BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
	}
	
	backHandler = () => {
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
	
	loadDataList = () => {
		this.setState({
			loading: true,
		});
		return fetch('https://meningococcal-distr.000webhostapp.com/lists.php?page='+this.state.page)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isLoading: false,
					dataSource: responseJson,
					count: 0,
					loading: false,
				}, function() {
			  // In this block you can do something with new state.
			  //console.log(this.state.dataSource);
			});
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
				this.loadDataList();
			});
		}
	}
	
	minusPage = () => {
		if(this.state.page > 1) {
			this.setState({
				page: this.state.page-1
			}, () => {
				this.loadDataList();
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
				if(responseJson == true) {
					this.setState({
						showLoginRegisterMenu: false,
						showRegisterForm: false,
						loading: false,
					}, function() {
						SecureStore.setItemAsync('usr', this.state.usr);
						SecureStore.setItemAsync('pwd', this.state.pwd);
					});
				} else {
					this.setState({
						loginFailed: true,
						loading: false,
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
		});
	}
	
	register = () => {
		this.setState({
			loading: true,
			userExists: false,
		});
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
				});
			this.setState({
				showRegisterForm: false,
				showLoginRegisterMenu: true,
				loading: false,
			});
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
		this.setState({
			showMenu: !this.state.showMenu,
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
		});
	}
	
	handleChange = (name, e) => {
		if(e == 'reg_usr') {
			fetch('https://meningococcal-distr.000webhostapp.com/check_username.php?usr='+name.nativeEvent.text)
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
			});;
		} else if(e == 'reg_pwd' || e == 'reg_pwd_rep') {
			if(this.state.reg_pwd == name.nativeEvent.text || this.state.reg_pwd_rep == name.nativeEvent.text) {
				this.setState({
					passwordNotMatch: false,
				});
			} else {
				this.setState({
					passwordNotMatch: true,
				});
			}
		}
		let change = {};
		change[e] = name.nativeEvent.text;
		this.setState(change);
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
						handleChange={this.handleChange}
						login={this.login} 
						register_form={this.register_form}/>);
		}
		if(this.state.showRegisterForm == true) {
			return (<RegisterForm 
						states={this.state}
						handleChange={this.handleChange}
						register={this.register}
						cancel_reg={this.cancel_reg}/>);
		}
		
		return (<View>
					<ScrollView style={styles.wrapper} stickyHeaderIndices={[1]}>
						<View style={styles.header}>
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
							<View style={this.state.showMenu == true ? styles.userMenuShow : styles.userMenuHide}>
								<Text style={styles.userMenu}>User</Text>
								<Text style={styles.userMenu}>Favorites</Text>
								<Text style={styles.userMenu} onPress={this.logout}>Logout</Text>
							</View>
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
		display: 'flex',
		top: 0,
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		height: 300,
		backgroundColor: '#0e1111',
		paddingLeft: 50,
		paddingRight: 50,
	},
	
	userMenuHide: {
		display: 'none'
	},
	
	userMenu: {
		fontSize: 30,
		color: '#FFFFFF',
		marginTop: 40,
	},
	
	pagination: {
		flexDirection: 'row',
		paddingTop: 20,
		paddingBottom: 20,
		backgroundColor: '#0e1111',
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
		textAlign: 'center',
		borderWidth: 2,
		borderColor: '#D4AF37',
		fontSize: 20,
	},
	
	button_login: {
		flexDirection: 'column',
		alignItems: 'center',
	},
	
	btn: {
		marginTop: 50,
		height: 50,
		borderRadius: 20,
		backgroundColor: '#999900',
		fontSize: 20,
		padding: 10,
		justifyContent: 'center',
		color: '#FFFFFF',
		width: 200,
		textAlign: 'center'
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
	}
});
