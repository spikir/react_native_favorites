import React from 'react';
import { Modal, TextInput, ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Button, Dimensions, Linking  } from 'react-native';
import { Font } from 'expo';
import FontAwesome, { Icons } from "react-native-fontawesome";

const LoginForm = ({states, handleChange, login, register_form}) => {
	return (<ScrollView>
				<View style={styles.loginRegisterCont}>
					<Image
						style={styles.loginRegisterImg}
					  source={require('./img/balcony-life-person-103127.jpg')}
					/>
					<View>{states.loginFailed ? <Text style={styles.regTextField}>Login ungültig</Text> : null}</View>
					<View style={styles.loginRegisterMenu}>
						<Text style={styles.textField}>Login</Text>
						<Text style={styles.textField}>Benutzername</Text>
						<TextInput style={styles.field} value={states.usr} onChange={() => {handleChange(this, 'usr')}}></TextInput>
						<Text style={styles.textField}>Passwort</Text>
						<TextInput style={styles.field} secureTextEntry={true} value={states.pwd} onChange={() => {handleChange(this, 'pwd')}}></TextInput>
						<View style={styles.button_login}>
							<View style={styles.button_log}>
								<Button title="Anmelden" onPress={() => {login()}} color='#999900'></Button>
							</View>
							<View style={styles.button_reg}>
								<Button title="Registrieren" onPress={() => {register_form()}} color='#999900'></Button>
							</View>
						</View>
					</View>
				</View>
			</ScrollView>);
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
			logged: false,
			errorReg: false,
			loginFailed: false,
		};
		
		this.renderrListItem = this.renderListItem.bind(this);
		this.loadDataList = this.loadDataList.bind(this);
		this.addPage = this.addPage.bind(this);
		this.minusPage = this.minusPage.bind(this);
		this.onPressLearnMore = this.onPressLearnMore.bind(this);
		this.login = this.login.bind(this);
		this.register = this.register.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.count = 0;
		this.loaded = false;
	}
	
	async componentWillMount() {
		await Font.loadAsync({
			'awesome': require('./assets/fonts/fontawesome-webfont.ttf'),
		});
		this.loaded = true;
	}
	
	componentDidMount() {
		fetch('https://meningococcal-distr.000webhostapp.com/total.php')
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					amount: responseJson[0]['amount']
				})
		  });
		this.loadDataList();
	}
	
	loadDataList = () => {
		return fetch('https://meningococcal-distr.000webhostapp.com/lists.php?page='+this.state.page)
			.then((response) => response.json())
			.then((responseJson) => {
				this.setState({
					isLoading: false,
					dataSource: responseJson,
					count: 0
				}, function() {
			  // In this block you can do something with new state.
			  //console.log(this.state.dataSource);
			});
			})
			.catch((error) => {
				console.error(error);
			});
	}

	onPressLearnMore = (articles_link) => {
		Linking.openURL(articles_link);
	}
	
	renderListItem = (item) => {
		this.count = this.count + 1;
		return (
			<View style={styles.container}>
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
						<Button title='Weiter' onPress={() => this.onPressLearnMore(item.item.articles_link)} color='#999900' style={styles.button_more} />
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
		fetch('https://meningococcal-distr.000webhostapp.com/login.php?usr='+this.state.usr+'&pwd='+this.state.pwd)
			.then((response) => response.json())
			.then((responseJson) => {
				if(responseJson == true) {
					this.setState({
						showLoginRegisterMenu: false,
						showRegisterForm: false,
					}, function() {
				  // In this block you can do something with new state.
				  //console.log(this.state.dataSource);
					});
				} else {
					this.setState({
						loginFailed: true,
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
		});
	}
	
	register = () => {
		if(this.state.reg_usr == '' || this.state.reg_pwd == '' || this.state.reg_pwd_rep == '') {
			this.setState({
				errorReg: true
			});
			return;
		}
		fetch('https://meningococcal-distr.000webhostapp.com/register.php?usr='+this.state.reg_usr+'&pwd='+this.state.reg_pwd)
			.then((response) => response.json())
			.then((responseJson) => {
		});
		this.setState({
			showRegisterForm: false,
			showLoginRegisterMenu: true,
		});
	}
	
	cancel_reg = () => {
		this.setState({
			showRegisterForm: false,
			showLoginRegisterMenu: true,
		});
	}
	
	handleChange = (name, e) => {
		let change = {};
		change[name] = e.nativeEvent.text;
		this.setState(change);
	}
	
	render() {
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
		return (<View>
					<ScrollView>
						<Modal
						animationType="none"
						transparent={false}
						visible={this.state.showRegisterForm}
						hideModalContentWhileAnimating={true}
						onRequestClose={() => {
						}}>
							<View style={styles.loginRegisterCont}>
								<Image
									style={styles.loginRegisterImg}
								  source={require('./img/balcony-life-person-103127.jpg')}
								/>
								<View>{this.state.errorReg ? <Text style={styles.regTextField}>Füllen Sie alle Felder aus</Text> : null}</View>
								<View style={styles.loginRegisterMenu}>
									<Text style={styles.regTextField}>Benutzername</Text>
									<TextInput style={styles.field} value={this.state.reg_usr} onChange={this.handleChange.bind(this, 'reg_usr')}></TextInput>
									<Text style={styles.regTextField}>Passwort</Text>
									<TextInput style={styles.field} secureTextEntry={true} value={this.state.reg_pwd} onChange={this.handleChange.bind(this, 'reg_pwd')}></TextInput>
									<Text style={styles.regTextField} >Passwort wiedeholen</Text>
									<TextInput style={styles.field} secureTextEntry={true} value={this.state.reg_pwd_rep} onChange={this.handleChange.bind(this, 'reg_pwd_rep')}></TextInput>
									<View style={styles.button_login}>
										<View style={styles.button_log}>
											<Button title='Registrieren' onPress={this.register} color='#999900'/>
										</View>
										<View style={styles.button_reg}>
											<Button title='Abbrechen' onPress={this.cancel_reg} color='#999900'/>
										</View>
									</View>
								</View>
							</View>
						</Modal>
					</ScrollView>
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
				</View>);
	}
}

const styles = StyleSheet.create({
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
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#0e1111',
	},
	
	loginRegisterMenu: {
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
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
		color: '#FFFFFF',
		padding: 10,
	},
	
	field: {
		backgroundColor: '#FFFFFF',
		width: 200
	},
	
	button_login: {
		marginTop: 50,
		flexDirection: 'row',
	},
	
	button_log: {
		marginRight: 50,
		
	},
	
	button_reg: {
		marginLeft: 50,
	},
});
