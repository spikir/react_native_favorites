import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, TouchableOpacity, FlatList, Button, Dimensions } from 'react-native';
import { Font } from 'expo';
import FontAwesome, { Icons } from "react-native-fontawesome";

	
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataSource: [],
			page: 1, 
			amount: 0
		};
		
		this.renderrListItem = this.renderListItem.bind(this);
		this.loadDataList = this.loadDataList.bind(this);
		this.addPage = this.addPage.bind(this);
		this.minusPage = this.minusPage.bind(this);
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

	onPressLearnMore = () => {
		
	}
	
	renderListItem = (item) => {
		this.count = this.count + 1;
		return (
			<View style={styles.container}>
				<View style={this.count % 2 == 0 ? styles.title_odd : styles.title_even}>
					<Text style={this.count % 2 == 0 ? styles.title_odd : styles.title_even}>{item.item.articles_title} </Text>
					<Text style={styles.title_date}>{item.item.articles_date}</Text>
				</View>
				<View style={styles.content_cont}>
					<Text style={this.count % 2 == 0 ? styles.content_odd : styles.content_even}>{item.item.articles_text}</Text>
					<View style={{flex: 1, ustifyContent: 'center', alignItems: 'center', height: 50}}>
						<Button title='Weiter' onPress={this.onPressLearnMore} color='#999900' style={{height: 50}} />
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
	
	render() {
		if(this.loaded == false) {
			return <Text>{'Loading'}</Text>
		}
		return (
				<ScrollView style={styles.wrapper} stickyHeaderIndices={[1]}>
					<View style={styles.header}>
						<Image
							style={styles.headerImg}
						  source={require('./img/sea-beach-holiday-vacation.jpg')}
						/>
						<Text style={styles.bars}>
							{Icons.bars }
						</Text>
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
		);
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
		fontSize: 40,
		fontFamily: 'awesome',
		color: '#FFFFFF',
		position: 'absolute',
		right: 20,
		top: 100,
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
		flexDirection: 'row',
		backgroundColor: '#414a4c',
	},
	
	title_cont_even: {
		flexDirection: 'row',
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
		padding: 22,
		position: 'absolute',
		right: 0		
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
		width: Dimensions.get('window').width / 1.20,
	},
	
	content_even: {
		backgroundColor: '#232b2b',
		padding: 10,
		fontSize: 15,
		color: '#ffffff',
		width: Dimensions.get('window').width / 1.20,
	},
});
