// import AsyncStorage from '@react-native-community/async-storage';
// import React, { Component } from 'react'
// import { Button, Text, View } from 'react-native'

// export default class Home extends Component {
//     state ={
//         key:'',
//         name:''
//     }

//     handleLogOut = async () => {
//         try {
//         await AsyncStorage.clear();
//           } catch (error) {
//             console.log(error);
          
//           }
//           this.props.navigation.replace('Login')
//       };

//     async   componentDidMount(){
//         const mydata =  await  AsyncStorage.getItem('token')
//           this.setState({name:mydata})
//        }

//     render() {
//         return (
//             <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>

    
//                 <Text> {this.state.name} </Text>
//                 <Button title ="Logout" onPress ={this.handleLogOut}/>
//             </View>
//         )
//     }
// }


import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  PermissionsAndroid,
} from 'react-native';
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Contacts from 'react-native-contacts';
import { database } from '../Setup';

export default class GroupScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fakeContact: [],
      SelectedFakeContactList: [],
      dataSource: [],
      modalVisible: false,
    };
  }

  press = hey => {
    this.state.dataSource.map(item => {
      if (item.num === hey.num) {
        item.check = !item.check;
        if (item.check === true) {
          this.state.SelectedFakeContactList.push(item);
          console.log('selected:' + item.num);
        } else if (item.check === false) {
          const i = this.state.SelectedFakeContactList.indexOf(item);
          if (1 != -1) {
            this.state.SelectedFakeContactList.splice(i, 1);
            console.log('unselect:' + item.num);
            return this.state.SelectedFakeContactList;
          }
        }
      }
    });
    this.setState({fakeContact: this.state.dataSource});
  };

  _showSelectedContact() {
    return this.state.SelectedFakeContactList.length;
  }

  // async componentDidMount() {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const andoidContactPermission = await PermissionsAndroid.request(
  //         PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //         {
  //           title: 'Contacts',
  //           message: ' This app would like to see your contacts',
  //         },
  //       );
  //       if (andoidContactPermission === PermissionsAndroid.RESULTS.GRANTED) {
  //         Contacts.getAll((err, contacts) => {
  //           this.setState({fakeContact: contacts});
  //           console.log('rajneesh contact else', this.state.contacts);
  //         });
  //       } else {
  //         console.log('Contacts permission denied');
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   } else if (Platform.OS === 'ios') {
  //     this.getList();
  //   }
  // }

  componentDidMount() {
        const mydata = database().ref('meetups/');
        mydata.on('value', datasnap => {
          if (datasnap.val()) {
            this.setState({dataSource: Object.values(datasnap.val())});
             //this.setState({dataSource:this.state.fakeContact})
             console.log("Original===>",this.state.dataSource)
             console.log("selectedList ====>",this.state.fakeContact)
          }
        });
      }
  
  renderModal = () => {
    return <ModalContainer />;
  };
  myCustomShare = async item => {
    const shareOptions = {
      message: `Hey! ${item.num} would like you to join flincs! `,
      url:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AABdhklEQVR4nO3dZ5Qk633f9+/zVFWHibszm24GcIELkiASIQYxggRJQACoREIySDFKomTJluRzfGy/9Dl+ZZ9jH9uSZUsWE2iJIqjABBEUAsEo3otAUCAIIl/cuHt3Z3dyhwqPX1RXT8/s9HSuru76fYC9Oztdqaurn+dfT/iXcc45REREpFTsvA9ARERE8qcAQEREpIQUAIiIiJSQAgAREZESUgAgIiJSQgoARERESkgBgIiISAkpABARESkhBQAiIiIlpABARESkhBQAiIiIlJACABERkRJSACAiIlJCCgBERERKSAGAiIhICSkAEBERKSEFACIiIiWkAEBERKSEFACIiIiUkAIAERGRElIAICIiUkIKAEREREpIAYCIiEgJKQAQEREpIQUAIiIiJaQAQEREpIQUAIiIiJSQAgAREZESUgAgIiJSQgoARERESkgBgIiISAkpABARESkhBQAiIiIlpABARESkhBQAiIiIlJACABERkRJSACAiIlJCCgBERERKSAGAiIhICSkAEBERKSEFACIiIiWkAEBERKSEFACIiIiUkAIAERGRElIAICIiUkIKAEREREpIAYCIiEgJKQAQEREpIQUAIiIiJaQAQEREpIQUAIiIiJSQAgAREZESUgAgIiJSQgoARERESkgBgIiISAkpABARESkhBQAiIiIlpABARESkhBQAiIiIlJACABERkRJSACAiIlJCCgBERERKSAGAiIhICSkAEBERKSEFACIiIiWkAEBERKSEFACIiIiUkAIAERGRElIAICIiUkIKAEREREpIAYCIiEgJKQAQEREpIQUAIiIiJaQAQEREpIQUAIiIiJSQP+8DkMXl5n0AIkvEzPsApHQUAMiFeiv5swWUCiyR2TgbXOu7JrOgAEC6zqvszxY8sXMkQOIg6awTO7UGiIwm/cZYDNakfbHdvzu/67+WAgKZDgUAJdfvDt85R+ggAiLnaCSO/dhxN07Yix2HseMgcTRdwm7kaCUKAkSG57DAumdZ9QwrFtatZc0zXLKWy75hw7NUjME34BsIjDn9He35WQGBjEMBQAn13kWYnt+2HLQTaCQJz7djngsTXowSXopinmsn7EUJ+3HCYeI4co7jJK34DxNH06n6FxmFBVaMYcUz1IxhxcCKZ9n0DBvWcNn3eLhiue5bHgg8Hq1YrvgeNWuodAKCjIIBGYdxTiV3WZxtPnTO0XBpBf5iO+KzrZgvtWK+1I54oZ2wE8XsJbAXp3f5MS5t+jfptpya/kUm1tvddtINkFbwlz3Dppe2CFz1LI9UPF5e9Xhl1efVNZ8t37JiDFV7fzCgQEAGUQCw5O4vDBzHCdyLE55uRfxRI+KPjyM+3wx5KXLsdZr421llz+BKXgWNyPgu+n6Znj+eSVsMNn3LpjXcCCyvrQe8rh7w2rrPwxXLZqfb4Oy29R2V8ygAKIm2c9yLHV9pRfzhUZsPH7T5bDPmXqdJv5Gkg/v66bYa5HGwIiU3zPfNAmvWsO4ZrvuWr1sJ+I61Km9c8Xkw8Nj0bN/BhCKgAGD5OHAmLUBi4DhOuBUmfOw45H17TZ46DrkdJRwkjiir8c8UEgZV9CJFdO53s/OLmoUNz/JoYHnzWpW3XaryVVWP7c64AUi7/YxRVCApBQBLxrn0bv92nPClVszvH7b58EGLzzQjbkcJ7cQBJvv/yXrzOmARGdt93+HO13vVGh4ILG+s+3zvRpVvWK3wgO9x2TP4ahaQDgUAS8IBLee42Y75k0bEhw9b/N5hyBdaEXtx2p/fW+nrQxdZLucFA4GFLc/y2rrPm9eqvHmtwuNVn63A3DetUMpHAcCCc0DTOZ5rxXyqEfGhgxYfOWjxTJhwlDicKn6R0jn1fXfpAMJNz/DVVZ+3rFf5tvUKX1PzuerbdDqhIoFSUgCwoJyDFo4X2jGfPI74yEGLjxy2+VIr5ihx3S+0+vNFyq23DLDAlmd4bc3nuzZqfMtahddUPbYCi29MtwtBykEBwALJvpuRg1thzCcbIR/cb/M7hy2+0Io5SNyp768+WBHJ9AYCvoErnuG19YDvWq/y5vUKX1312fTTB8QqDigHBQALoPtldHDoHH/SDPmN3Ra/ddjmM82Qu9HJFD7d8YvIRXrLiIqB677ljSsBf2GzynevV3m04p3KJSDLSwFAwWWVvwOebcd85LDFL99r8tGjkFtxQtj59FTxi8goesuMmoGXVz2+ebXCuy7X+cbVgEueWgOWnQKABdByjk83Qn7uboMP7rf5ciuioU9NRKbIAKvG8Nq6x1+5XOevXqrxWMXHV+2/tBQAFJgD7kQJH9hv8jM7DT5xHLIbX5yxT0RkEj7wUGB580aVH95a4RtWAtY9RQHLSAFAwWQfRuQcX2xF/OxOg1+41+D5dkI81yMTkbIwQN0Y3rDi88Nbdb5vs8aNwEtTCyub4NLQ44ALxgH7UcJTxyE/v9Pg/fst7kRJdy6/ojURmTUHHDvHk0chd6KE59ox77pc54maR83YeR+eTIlaAAogG2QTO8fNMOFDB23ec/eYp45CDhKnil9E5saQzhR4+2aVH9yq8/UrFdbt/enEZfEoAJiz7OSHzvGlVswv7zb5pXsNPt2MaOmTEZGCWPcM37oS8KNXVnjLWpXtwKBkwotNXQBzlNXvzcTxmUbEL+0e8292m3y5nRCr8heRAjmIHR8+bLMTJ9yLHO/crPJA4KHxgYtLAcCctZzj48chP7tzzG/ut3ghTDTKX0QKxwAtB584jjiIj7gVxbz7co3Hq4GCgAWlLoA5Cp3jY8ch//ftY9631+SubvtFZAEY4JGK5d2X6/zY9gqvqvoKAhaQAoA5CRPHU8ch//j2Eb+532JXlb+ILBADPBJY/vrlOj9xRUHAIlIXwByEzvHkcZv/+eYhv3UYpk/vExFZIA54Lkz4xXtNjIGf2F7hlVUfq9kBC0MBQM7CxPGHx23+t1tHfPigzbHqfhFZUAnwXBinQQDwN7dXeIVaAhaGMjrkKHRps///cvOQ/7ivyl9EFp8DnmnH/PzdBj+30+DpVqRZTAtCAcCMZSMswsTxR8ch/+SlY37rsM2xhl6IyBJwnT8vhAnvuXfMe+42eK4d45wSmBWdAoCZc4SJ4zOtiJ/ZafCbBy2ONM9PRJaMAZ5tJ7zn7jG/stvkpTAGHLrXKS4FADOWAF9oxfzcToNf32uxG6v2F5Hlk9XzX2kn/NTOMb9x0GIvcui5QcWlAGCGYud4IUz41b0mv7Lb4IUwVpOYiCw1B3ymFfHTO8d85LDFsWY5FZYCgBlxwG7keP9+i/fea/CVtjL8iUg5hA6eOgr5f24f89RRm1BBQCEpAJgBBzRjx0cbIe+91+DTrYho3gclIpKjloPfP2rznp0Gn21FKAYoHgUAM+AcfK4V8a/uHvPUcUhLt/4iUkJHCbx/v8Uv3G3wYhjP+3DkDAUAU5QFuPfihH+/1+SDB232NSFWRErKAbeihF/ba/GhgzaHKg8LRQHAlDg6T8tKHO/fb/ILdxvcDBOlxBSRUktnQkX8wt1jPnqs8QBFogBgihzw6WbE//nSMZ9vxd3fiYiUWcPBfzpq86/uNng2VNlYFAoApsABxsGL7ZifvXPMnzRCXdwiIj32E/jtw3b69NMoxjiUJGjOFABMgQEOk5jfPGjy/oMWDZf+Tte2iEjKAc+2Y9631+RTjYi20+joeVMAMAWJg8+2Yv79bpNn23E3N7aIiJxoOvij44gPHbS5FTmcUVk5TwoApuClKOY39lt84jiiqatZRKSvl6KEDxy0ePI4pBFroPQ8KQCYUDNxPHkc8v69Fi+FatISEblIBPznRsh/2GvylTAh0VMD50YBwAQc8Hw75gN7LT7TjAjnfUAiIgWXjpmC3zts89RRm8PEqRVgThQATKCROD7RiHjyqM2eElyIiAzt2XbMb+41eVppgudGAcCYEgdfbsV88KDFF9oxSnIpIjJYVtc3Hfz+UchvHbY5TJJTr0k+FACM6ThJeOq4ze8etHT3LyIyIgO8ECb8ym6D5/ScgLlQADCGBHguTPi9wxbPhLGiVhGRMcTAnzQjfuugTaMzFkDlaX4UAIyhnTj+tBnx1FHEcYwGsIiIjKj78LTI8f79Fjc1iyp3CgBG4DoZfu5ECU8etXmmrbt/EZFxGSBy8PGjkN87bNFSK0CuFACMKHQJX25H/P5hOn0FZbISERmfSW+q3rfX4qbGAuRKAcAIjIGDBJ48CvmzVkSCmv9FRMaVPUY9BD523ObjxxGhUytAXhQAjMTxQjvmwwdt9iJdniIi03IrdHzwsMU9zarKjQKAEbQcfLIR8qlGRKQn/omITCwrQ4+c42NHIZ9rqnU1LwoAhpBdoAex43eO2tyJNfRf5s8swB+RYWQ3U8+HMU8dtTmOlRgoD/68D2CR3AxjnjoKacbpeABdnDKqYSvF3uX6PV564PWXxwU6Yi1/NjDod4j6bpVL75TAjx+H3IkS1jzdn86aAoAhGKDlHB89CnmhrbmqctqwdWC/ivy8X7ozvzTGYM/syAcCY/ru3zfgm9ndhzsgco7zumwT0uldUfY+XPo753rf25ljO+dQ+x29AoTl1HKOL7VjPteKeajiEczw+hUFAANlo1T3ooSPHLbYd4mm/pVE1iw5qBJyZ39x3xKAMQQm3ZaHwbcn/W8VDJ7pLoZvzKkvZt3AjcCy6p3cP3vAZd9yzbd45xyhBbZ9w3Zg8Qa/1bG0HOyECbvx2XAFQue4HcXcix1ZyNxIHLfChKMkXT7uLJd0goPQuW7gEHYCi/QhMWc+BXPqry59JxefA14MY/64EfJNqwGBZy78DspkFAAMkF14z7Zj/uAopBU7jDEqbJZA9tkOaoa+6LOuGYNvIOj88TEEFizp7ysmrawv+R7XfUvFwro1XPMtFWPxgeuB5ZJvMaTbuOan/84CBGsMAXSChJOiML3DP79wNIDXCTpmJXHps91jd/8Zci6d2tXbOpDgCBNHTHpOD+KEF8KE0MF+nPBimNBM4E4ccztKuBcl3I4SGomj5aDtHM3Oz83EnTx+WzXE0nDArTDhj45DdiLHxqyiVwEUAFwoK1cazvHR44i7kcamLqJ+Fb07Z5neAWyBMdQMVC1UjKFm0wq1YqBiLHVreCSwrHuWbd+w6Vm2PMOWb6lay2XPsO0ZApvehQedZnxLWtGbTvP9SeV+UnEvBHPfDyN7bSd4iB206QQVzhEBUeIIcezHCc+HjjthzHNhwothzDPtmBfDmKPEcZQ49iLHUWfdBLUGLLK2g2daCV9sRTxSsTPtxio7BQBDOIwcHz1uc+yU+a/ozhtg1vt5WehWwgZDxcCqhQ3PUjOGDS+t6NdtWqFv+4Zt3+OKZ7kWWDas4ZJnuORZKtZQsQZLeifude76s7vycSvy88YKTFIEzqL4HPc7cDboys6RZ6By6pXTvqbmiDqtAKFL+4r3ooTbkePL7YjPtiK+0op5IUxbD26GCftJuo5G7SwWB9yMYj7fivjzqxV8T408s6IAYAi3o4RPNSOaKkkK56LR8pa0+d3r9KtfsrDpe2x7hsu+4ZLncckzXPUtNwLLprXcqHhseoatTgXvc9KU7nea8+2QFXtvADJoDXPm56IXduMe37iD+jyTjpOo9mzhgcDj1Q6+3gW0nKOROJ7vDCD7z42QP2mEfLYZ81wY01DUvhCycTd34oQvtmP2koRVT/0As6IA4AKGtEnxC62I22EMTtP/iqC3Sb93AF7WF1+xhk3PcL1z537VN1wLPK76hiu+x43Acs33uOIb1j1DYGy3cvetGThobtDnb/r8Lf0Nc47OO+/GpOMwahg2PbjuW15TD3jLeoUvtmKeOg757YMWHzsOuRml4w1Mn21JcTQTeKYdczNMuO7bxekWWzAKAPo46f+HTzcjDmNUks9ZVnBnA8ONSfvm6xYue4bHKh6Pdv48FHg8EHhc9S1XOhV/0LmL9E3njvKCfZ1b2Zz5W/I1TOuB6YzbqFmPbd/j1TWfb1wJ+NBhi9/ca/HHjYj9RNV/UWWfTOQcz7UTnmnHvKbuz2wmS9kpABigETs+24w4SpSZal66Fb9Lm/Pr1rBmDQ8HlldVfV5d83is6vNQYLnue1wLDOueJehMr7N95spf1M+uSn5x9JsO6BnY8i1vWg14pOLxulrAL+82+Y/7TZ6PXDfI13e6eBLghXbMM51ZIlWjcQCzoABggHtx2ofYVikxN4505P2VwPJE1eON9YA3rgQ8HHhc6cyF3/ANvjHYnjn1Z7eR0Z38cjv7uQYGHqx4bPmWxyser6v7/OzdBn/ajPS9LqAsKNuNE15oRxxFCWuV87JdyKQUAPRhSOctvxjF7MaJRhLPiQFu+IZvWa3w1s0ar6373AgsVzxLzZo0Q9456529W1DhUWZpC1DdGr6qHnAtsDxa9fiXOw0+fNjW0+cKqu3gpXbCbuK4hr7Ds6AA4AKtBJ5pOw7OyXQms+cBr655/MhWnb+4WeORiseKNeeOwleFL8OwBrZ9y9s2qjxe8XnF3Qa/dK/BM6GC/KLojgPAcTOKuRMlPI7D17d66hQAnCOrTNoOvtSM2OvcIai/MD8WeGPd5x9eX+UdGzUu++l9/jlJ5wBV+DIKQ90avnbF8l95hkcrlp/eafBpdQkUSuRI8zqEMYkL9CWfAQUAFwhdwu0o5lijhnOTfcdfWfX4B9dW+cuXaqzZk0Z+zQaSSWXXkAEeqXr8F1t1Nj3LT+8c84lGpBa/AjCkwf692LGXdB44pYGAU6fnLV7gKHbsRGnucdDd/6xlLSzXfMPfuFzj7Ztp5a/zLrNgOv+94nv8pUs1/tvra7xjvcoVz2BwqmgK4DCBu5GjrZuwmVALwDnSAYDwUuTYixOSfu3OMjVZ5V818J1rFf765TrbvlXELzOVXVsbnuW71qtctpZNz/If9ho83wqJjQWr+6S5MOlTIV+KYg4Tx6ZTC+C0KQDoI3aO3Th92IjkwwBPVH3evVXnZVW/+zuRPNSt4evXAi77hge8hPfeavJn7YjYD0DpaOciAXajhEaS4M598LVMQqFtH7GDe3HCsVPT/6xld/8bnuGdm1W+caVCxeqrLvkLjOHVNZ+fuLLK37u2ztd6jiBsQxzP+9BKKcKxGzsaDpyKhKlTC8AZWZNzDOzGcJQ4TQ+aseycP1Hx+K71KluBxTmHUXufzIExhoeqAe+6tsGqZ/j5Wwf8QSukAWoJyEl20xU72E2S9EFs6g+cOgUAfTgHB0lC06n6n6Xs7n/VGr5lrcKrql76/G+Nu5A5MYAzhiuVgL9ydYMrgc/KzT0+chRyABjPU6tgThIHB4mj5TQzYxYUAPThSOehxqr/Z844uO4b3rRS4Ypv0yBfd/8yR2kQABuBz7dfXqXmGS7d2udX90P2ADyLbkdnzwFR4tBQrNlQANBHQvogoLbGAMyUA6oWXl8PeHXNp6a+fymI7Epc9S3fvLnKirUYdvnV/ZBdfAUBM5a1DjYSR9tlzwHV+Z4mBQB9xM5xJ044VBbAmcmSfdQ9w9etBDxW0XO/pXgMUPMsb9qo84+sYd3f59/st3kpAWe8kwtZ1+70OdiJHUfqApgJBQB9ZF0A6gGYnSyev+ZbXlH12fA0KUWKJ3uYdMVaXrde5+9Zi2f2+KW9NjddAs7g1HI1M7HTkKBZUYl7AX2lZ8+38PKKx8MVS6ATLgXnGcOrV6v87RubvGujwiM2wejeVBaUAgCZi6yuD4zhsYrHA76HVcglC8Aaw1etVPnJBzb54cs1XuGDddk8NZHFoS4Amas1C49WfbZ8g9HDPmQBGMC3hq9erfJ3fI91/4Cf3jnmC5EjscoTIItDLQAyF4704rvuezwSWOpGl6IsFmsMD1cDfvjaOn9ze4WHrIM4VpeALAyVujI3noEbgeGhwMPvXIm6+5eFYuDBasC7r67xVzcqbCQRLk50HctCUAAgucsKR4vhmu9xI+hk/xNZMNlV+2A14PuvrPH6CnjtFi6O0ZgAKToFADI3AXDV97jqG+VZkIXmGcMT9QpvXq+zFofQbmHiRPPXpNAUAEjusiJx3TPcCAx1zaGWJXDJ93jTRo0bHtBqQruVBgCKAaSgFADIXBhg00u7ANT8L8vAt4arFZ+HawFeEuO6QUByEgioRUAKRAGAzIUlbQHY9i3ZxCmFAbLIDLDmWa5XAgJj0hkBzcZJEKC8olIwCgBkLgyw7lm2fYMyAMuysCad3dINZuMYmg1otztJLhTmSnEoEZDMh4E1a9jyPTzd+8uSiBMIkzP3+lkQAFCppkGAAgEpAN17Sa6yYs/HcNmzbHVu/9UzKosue3TtvTCi8xDRk+s6CwJaLUg0O0CKQQGAzEXdwpZvqOgKlCURJgm32iHPNEOi5JxkQHEMrU53gIIAKQAVv5KrLNf/qoFt72QAoMii24sSPrZ/zAvtsP9C3SBALQEyfwoAZC5WrOWKb9T/L0vBOfjscYsP3z3kIErAXPBEgDju5AlQS4DMlwIAyZ0B6l46ANDXFSgLLKu6n2+3+dc3d/nUYYtkmPo8jqGtIEDmS8WvzMWaNVxRDgBZYFl31k4Y8XMv3OPfv7TPQZwMP8C/tyXAOQUBkjtNA5S58DHUrSJQWWAO7kURv/jiHv/subvcbEUYM8SMlt4IIekEAcZAJSD9RnSejKGpgjJjCgAkdxZY9eCqZ7GdvlIVdbIosoy+L7VD/u2tPf73Z+/wbDMcrvI/T5LlCXBQqYBRWCz5UAAgc1E3hlWlAJQF5JzjZivi3720xz97bocvHrfT30+y0SSGZhPotARYzY+R2VMJLLnJ7vIDA5ue1UOAZKGkd/6Ou2HM++7s81PP3+Uzx63RKv6LrvmkJ21wkqD0WDJragGQ3GTFWdUYLvkGT/W/LBDnHLthzG/fO+S9t3b5s6NWN+Pf1JxtCTBWYwFkZhQASG46Q5vwDNStUfOTLARH+ijfe2HMB+8e8jMv3OUP945pzWrUftYS4DpjAqyCAJkNBQCSu6oxbHlWSYBkITgHe2HMh+4e8M+fSyv/46Em+08g6eQJwKUPEFIQIDOgmzDJnWdgxbPqApBCc53/HUYJH7x3yP+bV+WfieM0ZXCoZEEyG2oBkHy5NACoGE39k2IzGI6imA/dPeQff+UOHz1o0Myr8s9kyYIcUK0AagmQ6VEAIPkyUDOGG77BN91fiRROM0744N1D/tdnbvPU/jFh3jfg2aCZpNMSYOjJE6BvjUxOAYDkLh0EaNX/JIXjOgn4mnHCB3cO+J++eItPHjZJ5nVAWT2fxNBqpT9Xqqfrf7UIyJgUAEjuDLp/keJJu9gdB53R/v/z0y/xicPm9Gbjj11Rd9brTRscVFTxy8QUAEjuAmNYtwar8ksKIh3uB/tZn/8zt/n4wRQr/1GZ+35IJUknTwBpEGDVjibjUwAguasYw7af9mPqOQAybw6H68zz/9DdA/7pczs8ud8gdgW9OrNkQY6TPAEiY1AAIPnq9LF6ar6UonBwtx3zoXsH/NTzd3lq7zj/0f6jyroDoDMw0KhLQEamAEBy51HI+yopocTBnTDmA3cP+Onnd3hy75jGLCr/WVTOWRDgXDpFULMDZEQKACQ3DvAsXPH1ICCZn6xh3+F4oRny/p0Dfv7Fe3xs/2ySn3lfo0Ps/7wpgvpuyZAUAEgusinNPoZL3kkOACmeUe9/F+WjzN6XIb1pfvq4zXtv7fKLt3b506PW7HL7z1rvFMFAzw6Q4SkAkNxZFU5TNajaOntPO+jsz+rTcfQ/1lH2OeyyZ/eVrXcYJfzZUZOff+Eev357n2eaIRFucSKZ82RBQJYxUN0BMgQFACIL4rzKc5wK3TmILwgbIgdRkgyV/MY3Bt8MntJpSAd+TrtKuiigOLuvwyjm6UabD+wc8Cu39/nUYYN7YXKyjYIO+h+augNkRAoAJFeegXVrlQNgDOedMocjTCByjsg5EgftTuXtgNg5wsR1K7lGlHCrHbIfnx8COAe7YcxL7ZBW38FwaYeOAS4FPlcrPlXPXlh3egauVwK2K3762fds2hoIrMU7s4+KPT1bxALVnilv3gWzSWLnaCeOVuI4ThJeaIZ8YOeAX7u9z2ePW+yFMfEFxzvVSGDUSthMsP8sCIA0Y2B3O07BgNxHAYDkKjDwQGCpqDA6l3MO0zk36XPoDQ5HM05oJUm3QmsnjuPYcTeMuN0O2WlH7IQRR6HjuVaLwzit9HfDiFutkKhT4TocbQex672/P/1ZxHAqaDhfuo5n0sROF3+c6Z1/YM3J4M+e5WvW8EA1YNWznWNMt/lgNWDDP3lo9KpvebgaEHS2seZ7XKv41HvnwZv02G+1Q55thnzhuMVnjlp84bjNzXbEXhT3v9NfhkvS0NMSkGUMzF4QOU0BgOSn080aGDALOt5q1hzQjhOOk5h7Ycy9MOFeO+SZZpsXm21ebEV86bjFThhxux3RSlz37j9yJ3e+WfUeO5fOdet1X11w3lOZhu1YcEMs3vOiu/9XAH921DrVKpReJ/bUYFFr7KlgwyMNKk61PZh0F6FLg6RmkgZPseu82Jkuv/SXXzdPgIOgiprc5DwKACR3S1/4jiFxjuM44blmmy8ctfj8cZPPHTb5/FGTrzTa7EYxYeIInaOVdCr284a5mft+gzlT+N9//kd9LKO5/+e+655+odtScCYmSLsrTq8ZuTOjEM59zxftznTvfrP9DrGF6ZpnS1d3dkDWEmDVECCnKAAQmbNGnPDloxZP7h3y5O4RH9894ulGm+NOk3+cZBVhp0Lr3gWfX5q7Mz8XKeAa5VjOb6i4/z2f13Ax2TmYYy05ya7PW7c3Y2BQodsEIoICAMmZASoqg7qaccJ/unfIv35hhw/vHHCzFdKIE5LsubTQHROQmW6lPoUPYkaf5bDvsUgBTiH1ZgysaIqgnFAAILkKjOlkApz3kRSAg+eabX7uuTv86q1ddqOTceknAwFzquDy/DzG2teMD3DZr8ck6ZkdoCmCktJjpCRX1sC6dzLlq8xFUMslPLl7yB/sHrIbRafmrhet6f7ELFL2zNI8m/OL8P6hew6yIKDdApd0xlRImSkAkNyV/aLLit2DKOap3SNut0KyQlpF8gSmUt8Wof9/hseQJNBup39cli1CykpdACI5y/LgPN9s89nDJked4e/5F8XF7f+XEY3yOWRBAKg7oOTKfjMmMhftJOHPDpu80Gx3pvQNadEL6lwPf8idLfgpHUuWLKjdTrsCHOoSKCEFACI5yorYVpzwxaMWd8JoSRthF7FWnWP631kcw6DtZS0BYdYdQCcYWM4rUu6nAEBy5QErZ7O3ldBhnPB0o8VelBa8C3k2inTQRTqWcUx7/v+wsmRBYVsVfwkpAJBcZGVUYAwPBRZjGOppc8vGAAmOl9ohd9oRUTJC//9Um//NuT/OVBEr6SIeU97OBgGL3s0kQ9MgQMmR6+R4L3cBEyVwqxVxL4xLGQSNrtzXy+yZtDug1Uoj0UolDQJK/j0tA7UASO7K2tCYve/YOW62QnbCKM34tzCGrRCKUHFo/v/ITuUJWKTrUsalAEAkZ5Fz3GqF3AsjtQBMQ5nn/w/7FMYL9VT2vQMDE+UJWHYKAERyFiaOu+2Q/U7q3/yrHs3/l15nPsysJSBspY+SVgywtDQGQCRne2HEnXZEOynA/P/CDwCc4QEqiDmfoSdZkNFTBJeYWgBEcmIA5xxHccJhnHRvrBbjBmuRCn/1/09Fb0uAU0vAMlILgORqiYrHscQO7oZxOgNABerkytz/P9yGJ3NfS4AljQSMvsxLQC0Akousrtv0LH72nPv5Hc7cOKCRJDSShGTYW6pZzf/PaxNl/KCXSbclIDzJGIgyBi4DBQCSCwd41vBQxRKUsELonQJ4tx1xtx3NvwVg6M9hXh/YOPst4cU1kSHPV5JAu6mMgUtGAYDkJk0CVO4i2gFHccxRnOA6iZGWy6K9o5Ll/59k1e4UwVAZA5eEAgDJVdnvHWIce1HMfpQs5skoUplfpGMZx6THP4/3nz1FMMsToNaAhaYAQCRHrTjhOEqIXGcg1SDK/z8bRT2uXI3ZxXK2JWAhI1kBBQAiuciK2uPYcRAlunEaSDV0oXXTBqslYJEpABDJSYKjGSccxTExbkHquFEOciHe0GwsQ3/4qG8hSdKugKwlQEHAwlEeAJGcOAd7UcxOGBGrrJxM2ef/910t5/fUzRNAJ08AyxEMlYRaAERy4oDQOVrJSb9pfnGA8v9LrylOsTw7JkDB7cJQC4BIThzpkwDDxA1XRir//2wokJm+JElTBgMEAScnueTzfgtOLQAiOXEO7oURL7VD4rlnARpGQfv/p9L8vcDN/7MwjSmJWRBwKlmQxgYUmQIAkRxFCcO3AExNgSoamdxc+v9HyBjYOzBQCk0BgEhOEhxtl9BKHMmghUvb/D9jRT2uXM34JHRbApQxsOgUAEiuPMCUrBTuNoY6OIwS7kURuKKnAZ5Xc3pR0unKRLIgIFKegCJTACAzlxXNPoZt38MvcVkdJgntgbf/slDGusNdkPz/k7hvdoCCgKJRACC5CQxc88r5NECAKEloL2ohWJTPrCjHMa5FzP8/yKAHCN03MFCKQtMAJTfGgGcMxSzFZid7t40kYTeMBz8HQPn/Z6Oox5WrObRWZAMDDeBX0utb4wIKQS0AIjkJE2jEeg5Af6oUllaSQKsNbXUHFIkCAJEcLUYVtyDz6bvmOae/CO9/Ankevuu0BEQKAopCXQAiOYmdo+0ceWcBWBpTq6zmXWkveP7/sXdt0iCg3U6nxgRBur7rvDbvj6WE1AIgkgPn4CCOudUK0zEA/Qq7WfX/i8yj//88vcmCEmUMnCe1AIjkJHHpw4DmUsxdNOYQsCb76ZwFL6wDRl1+hO2c4jAmvVk8/STFIXc2i1hIzf/j79f1DgwMFv9cLigFACI5KkoxZ4DAGK5WPK5UAq5UPFY9//wmwVyangdsy0DoEnbCiC832twJ4zEfqTzv5vKiXAF5O+d9Z0EApEGAVYN03hQAiOTAkbYARD1PS51Xg+eqNTxcq/DqtRpv2ljha9bqPL5S4Vq1gje3+uniHTscrSThc0ctfuPOAb9xZ58vNdqEZWk1nsvnksNOkzNBgKYI5koBgEguHI0kYT+M+t+5zjj/vwGuVHy+7fIab72ywTdcWuXRWsCq71FdkIL3wWqFx+oVtgOPn33+Ll9qtHGDjrv4b6vcsoyBkAYBGhCYGwUAIjlwQDtJOIwTXJ6DnXoq/6sVn3dc3eBHHrrCG9brbAR+p+//5BiLrmINr1yp8heurPPJvUOebbRoOzDGLMTxSx/d2QEOggoYdQfkQQGASE6yboC8GeBK4PHOq5v82MPbvGlzhRXPS6di9yyzCDddjjSb5EPVgAd9ix9HtI0Fb5iibIrvsDCtJdOeUjhHLklnBmDSKYLWshhh6eJSACCy5LZ9j7df3eRvPXKFN2zUqVm78E9prVpDBTBReNJvbLxiVmww2XEt/HsaIR1178DAQLMDZk0BgEjO8rinMaRN4hu+5e3XNvm7j17lDRt1qtamry54udp9pLRzEMWkd42VNAg4vaAAo5+IOZ64s7MDZGYUAIjkpJ04juOE7FFAswwEHI6aZ3n7lU3+0cuu8bXrdfzOg5gWvfK/jwOiiDQIMJpOtgy63QFAxbt4WRmbAgCRHDjgOE7YiSLyaH+vW8v3bG/w37/iBq/bqGOMAeeWr/KHTjTl0hzzkLYEWHvmJnaO/f/mvh/GWHeKFuUacDGEQOSlAYFMnQIAkZwkuM6jgGfHAOu+x9uvbPLfPX6D12+snNRXS1n7k0ZXltNBQCXojCQ3PQst2/sf9v3MoPl/5lmFOwsncdodkCgAmAUFACI56p9UbzqV05bv8/Zrm/w3L7vGGzZXlq7Ku1B2DqMQjEufPW+99OdynYnl0jtdRaZKAYDIEsim+r392iZ/59GrfO1GbTlves9zXordMAJsWsJ59v7Xx97Xgp/QBT98mS4FACJL4ErF553XNvnbj1zljRt1PCVS6XQHOKAC8xpHNkn//3Abzt84TflSSAoARBZYeufv87Yrm/zYQ1dOpvoZs9xFr+n5049zndkBnWBomi0BeVigQx1IQUMhKQAQyYFzF2QBHLNZOWv2/77rm/zoQ1f4c5sr1MpQ+Z8yIAroDgx0QABe2aaUledKkNEpABDJQStOuNuOiKY4mHk78Hj7tUv8rUfSJD+1zh1u6Yr8YbLLRdHJv22BMwaK5EgdhSI5CJ1jP4pJJhzOnNVbG530vn/30bTPv2ZLWvkPlD3lsNMSELXT+eVjbWrcs1uQ/n9dHHKGWgBEchIz+WwmB6x2Mvz9w5dd57XrdXzbyfA3+SEun7MnJWsJCKqzzxhY6vz/Iy88wToyLgUAIvM04l3lum9565VN/odX3uC160ue4W9S/U5KN21wZcnTBqsClospABBZAAa4VvH5/huX+S8fu8Zr1urLn+FvEoPOSdYS4FfAmsHLL/o5XvDDl9lQACBScBZ4sBrwrge2+HuPXeXx1dq8D6nYhqqsXU9LQDDCesMew30/THvD+dNUvqWjAECkwDwDj9Yq/LUbW/zYI9u8YqWqonUqetIGA/h+5wFCy3J2C9T8P/Rml+XcLw4FACLzMqCy8Qy8rFblXQ9c5kce3uZVK7W0z1/6G+f8dJ8i6AOaIijloQBApIAM6Z3/ux64zA89uM0rV2t4qvxnJ4kgIk0ZfDZZkM67LCkFACIFtOF5vGV7g3c/uMWr16sEqoNmx9CTNrjzbztBxsBJ+//7PzJyvO1Ng/r/l5ICAJGCMcDD9YBv317nlas1Aj3YZzgT36lnQYAD34CxdDM3LH0rwLz7/2UeFACIzMMFFYpn4HrF5xUrFapWJehM3Xd6e2YH+H4aBCxc5b9oxyvzolsLkQLyrSFYuIpnnkY5V0MsG4UnrQEiS0oBgEjBJA7uhQk3WxGRUwU0kGM2U82iCMIQkhGe4FTE/v9c48iiPC9BhqEAQCR3Fxd2CfD0cZM/vHfITjvEofvQ85meP8Mu3/+f97/Y6Q6I2mkQsBDB2Azm/6tOX1oKAETyNOTd6r0w5rd2DvjtnUPuhSHOOQUBucuSBUVpl4BzCxIEiAxHAYBIAUXAfz5o8HPP7/DhOwfsh+kjbFX9jGvMMQLZj1HYCQKStI9mUeguXC6gWQAiBXWcJPzu3QN8Axu+x7dsrbFiLc7o0b+jmdIAwSxjoOeDuyhjYIH6/yel+f9LTQGASIEdJ47fuXvIhu9RsYZvvLRK7WymOhnduHVVliwIzskYOPbRTMki5v+f4THIQAoARPI0xtS+gzjhN27vkTg6QcCa0gL3GjiYbyob6rggY+BIsxFE5k8BgEiexqwgdqOE37yzx0bgsRUEvHqtCqgr4GITnp1zV++ZHQBpCWrt5PuahQIekhSLBgGKLIjdKOGXb+3yT55+ic8dNtGQwGkatrbsuc2PovRP4kabjTjS7tX/L7OjFgCRvEyhjLzTjvilm3dxzvEPXn6dV61WsWXtDrgwDcC0m/77iLPugKC4LQF9qf+/7NQCILJAHPBSO+K9N+/xf33lNl8+bilHwH1mWamcM0Uw7skTMDeqSGV0CgBEFtBOGPHrL+3yCy/c49lGG6cENR1TqghHbVXopg2OpxgILEr63xmatGtFLqQAQGQBOQzPNtv8yxd3+MWbaRAQqyVgDFNMI5yNCRg1Y2ARK7hxm/HV/L9QNAZAZOGkBWcEfP64xc8+v0Ps4K/duMxj9QqeHiF8sZFPzzDPEOgZGAjpo4SdhVw+iwLN/5eFohYAkQUWO/jcUZN/+cIO/+7WPZ5vtklK2x1QkEqt2xKQaKKGFJpaAERyMqtoO3Lw2aMm73l+BwO864HLPFKrYMo6O2BSF522YccG9GYMtBelDZ6BZfnYOykXFETNjloARHJQ8QxbgY8/zUq5p2AMHXzmqMnPPb/De1+8x4utcHr7WQhDnlfT9x/TF0UQx+mjhIc6nkW08G+g1BQAiOSgYi2bgc9Us/ifKXsjB585avFTz93h/3v+LjebaRCgG6iOseqqQQPcBmw0itJpghcFAbnT/H9JKQAQyYEhny9b5ByfO2rxz569zT9/9jYvNEMMmh0wnkGV1AjPDoiKFgSIaAyAyNJJgC832vzUczu0nOPHH9rm8ZXqWA8iWhpjzvYbef1zV3QnGQP9YLYzA0r8Ecvo1AIgslCGK+Ed8GyzzU89u8P/8fRtPnvUJO7MDliGpEGJG2F82Fipgqdx999ZJgu8zmYMnNpTDEcxxHaH3vW4xzjiegpqZkYtACKLaIhC0WG41Y74pZv3aLuYH3/oCq9br1P3LeBwzixso8B+GLEXxoMDgLEeCTCNyr/PonFPngBvGmnuCvIBzvQwCvIel5ACAJEczaMoe6kd8Us3d9kNE37owS2+8dIqlwNLYKY3JHGWbQrZOcuew9dOEr541ODLR03CJAHMbMc4jDVz4ILl4qiT4tbv/K0KTuZDAYBITirGsOLl2euWVpkOuBcmvO/2Ps+32rzz2ibffnmNV67U2PAtvjH35QxI66XhKqa80rUbIHaOZxstPnx7j08fHBNdVPPn9EDAsfRmDIQzQcCYB7NMccQyvZcCUwAgkgMDrHiWrcDny6Y9l1H5R3HCH+4e85VGyJO7x3z9xgqvqgdcr/h4PRWQNbDqWeq+N1Q5XDGWVd8jGGJwmzEGy/A3vQaDNYbEJbSTtPL/9Zt3+bWbd7nTDulbU4xd+Y+cBWh8cZz+7XlgbGdE1pxrvplnFVbNXiQKAERyYg14xnQTnI1u8sIzdvBcK+Sl23v89t0DHvQtD/qGANcZm2bwLKz7Hiue11NR9993zRrWA5+g8966i5/zRj1juBT41Lzhgouab9nwfRpxzIutNn+8e8Tv3z3g6eMWca5R1JQrru7AwCwIIH12wEjdAaMe0yJWvnoc4CwpABApk05Z2k4c7SRmtx3xuSSGsH3qCXYenQGCQ9wdW8Ce14R9zuIWuBT4VD2bvjygbK95Hmu+RzNO2GlH3G6HNOKEC2fUz73pv//7777gel6PY7qZIqzTmADJjQIAkRwVZgJetyXCEFrSfPVhRHaEIedNVbugYjr1xi7OnrcXxRjMcDPSTBpcOEx3GuPFKwxeZPRlc6iQs9kBxk/3V4ab+36W6b0UnAIAkZxYDEGB7u46Lf5pLRtU0n905qmPfJQjJNBxI4zadxgS1z3aM70K056HPsXP5qK7/36vZ7MDPD8dE5A39eWXjgIAkRwYDKu+x9WKh28N7WTUtoApFLj9NuFMJwgI0n+HYWGTB0/tqIp0998r6mkJuDAIKEgTgYKGhaYAQHKVFgG9HaDlYIDAcNL3zblj5Ibf2NSZtBugEwOcylg31R2OkkRnxP0OXDyHa+7CYx5y/71pg4c5B0v7Vcq+IcUMRpeBAgDJTeKgkST6Oudm6Ll2PT93ggADhCETFb6TVEwDKz5z4T9HWfXCDUytch32s+hUet3ZAX76u1l3HRXlTn5pg5li0rMAJDct5/hyO6JZ0oeiWQO+SbsDRjPD5v+zLxrSpmc/SP9MMGlx4H6GWW5q8rj7n9ZyPVME4yhtiekZB7GYVLMXkVoAZOZcz98tKGz/8kwZR82mc9q9ie6Mp3ZEF+zDpEFApdMEPWlLwMj7n+EG51IPTRAZ9LYEMGqegEVWlvc5X2oBkFyV+Wtd9Sxrvpc+DXbm9emEZ9oYsDYdGNhtCRhhv2PvfowVp3bnPcHywyQ1GLSBfqt3WwKSU7kaRCalAEAkB6bT8G87/yq8bI6gMWlLQDBKEDCuWdTkC3CuhxHHkGTdAQoCZDoUAIjkxCN9IFDuJh2MZztTBCcKAuZcEec+5mAUQ+4/yoKA5GRw/DQOfdwBgEWdSilD0xgAkRnLyukVz3I58PBN728HmUP/9X37MemtQk+egOnPDijY3f8oTfp5BhdxnJ56z4yQLGjRKuBFO97FpRYAkZwE1lLzss6ARdMzJqBvS8Ck/f+D1h2z8p/l6Tb3/TDhdi5aprNQ0mkJuPiJCCIDqQVAJEceliGemjuhGd0lu86DaqbVEjDOMYy66jibziVgGGNn9z1ACAZnDFwgixgXL7gluXJEis+QPmb3su8t9nSuLAg4ryVg5Ob9eTf9Tzuh0Kz0mSIYRZMNCixKAiCZC7UAiMxYVmxaY6h6htVOOuDBxfasEwCNuHwWtDh30h0AadrgYVsCphELDLODibc1YANDbX+C4GLYfXbzBHhpS0BegeXMdqMgI08KAERyZEkH1Y+cCmAmI67HLGyzSiZrCRg7WdCEd//TruTHPpwhVryoZWTS9xHH6Ua8ns/l4h2LAAoARHJjgLpnWfO8bsr3hZZVNL6fvpdRWgKKJtd+/xnIHiDkeZ19Zju9YLZJkZr/FafMhcYAiOTEGFj1LBu+hzfqw27G2uHkmxi8D3PSEjAoY+BYx5ND3/9Eu+i38jRP/pDbiuPONMEsWdCMLoAiBQ4yEbUASK7KXBwY0qmAVc+QjQIYqiFgbvP/h12vs+K5YwImmUs/bhfFeKsN3MDUmv5H28Rwy3UWiOP0R3u2JWARLNKxLge1AEhunIPQlfJRQEBavK1aw0b2PICZ7GEWyw65OdOTJyD3x9fmcPc/qgu3bWa37yiGJNGzA2QgtQBILgwQO8cLYUJY0jLJGKh7Hquel5b9M2ylzVfvYDbT6QqgZ2DgOG9yVidmUOU/xbv/ecpmByxCS0CBD23ZKQCQXGRN3buRI+rclSxN/Tckg2HFM6x5FlvkAnkS2ZgAP0g/4Ox59mXrN57aEI8Rz0V3cXcyMNCek3di3M+jbJ/jklMXgOSqpDf/3fe94lk2fDvgi5dTE3WfXU6sN2Og7+dbDwxqdh9n5ZHv/mfQvTLuSnGcpg5WV4CcQwGASI58a6nabBbAMhTKF43677QEZF0CQ21iVt0F06qUcxz4N6p+gUocd1oD3Gz3LwtHAYBIjiyw6Xts+tPO2jbHAYD3bd6cvLcsY+B9QcB5xzDJjIFJmP4bHTU4Garyn9rQ/5PlBi3aTRucMFrgmfdgTsmTxgCI5MgAdc9Q60wDuL8onlKJWISC1XQqpt4HCEXhPA5kqF+NvI1zF5lD8/+wXRRx3AnM7MnnMu1jGW9hmRO1AIjkICsOjTHUPcuK53Uztw5cadbG3s8QK7rOcvclCzrbHD3uQUx6EnNshRl1V1M9tN4xAUlPsqCiUMAwD2oBEMmRZ2DDT7MBTq/IK1Dzf9/ddvabPUFw3JaAqR7+PM7FlJv/R/roe4IASLtnen8vpaMAQHKXzPsA5sgCa57XeSLgsgwE7ONsvWI6fe1BAMZ1+qTPWW7Y7U3ruKaxwqBKtGh17FBBgPr/l526ACRHhpg0F0D6r/IxwJrvse7bbjZAc+rVKe2kqLK+Z7+SdgfMrQQq8kligjwBI4x3GKU7QP3/S0kBgOQiK16iBO5GMcmouWGWhDFpMqAVb0AugGU+OQYwNs0R4A14gFDvOiMvU5CTOIsWB5hO030hxgQU5HMqIXUBSK4S40gTxJYtD+BJa/eq57Hue51sgJMWuvPq/59w0J4BjAd+p1tgrDEBBbl+LqqIR51GOOxi0+w20ZiA0lILgEjOqtZyyfep25J//bKMgb6fc8bAeQRN076rn/J7iONzHh40wxYBxRiFUPISSCR/noXNwLLm9csFMIGiFKyjjk73A7B9GiTn1XAx1LLD3v1P0bBBwqj773YHcPqiVP//0lIAIJIzi2Hd81jxvPO/gHmWoWPta1qDFXu2Y7MxAd6QuzIX/vP8Fc1FGxzDNJv+zXAV+4WLmHN/HGqb2fJJfPIAJ2dyuBYVMMyTxgBIrpyD0C315LeBPGPYrvhsBB7GmAkGXy3A/P9Tzhuh3vM7z4LpZAyM42Iccl/3TeG4eLlpLGaGXHCccQe9kjhdz2brT/mDKPTnWi5qAZBcRc5xO4rpzAQsVSCQlXtpMiCPNd9il/EMjF3Am55nB3iDFx9123nFS+a+HwYsP8V+/6lUrqbzBMEEkqJlDJRpUgAguYqB/dgRl7hM8YDLgc+612kBAIa/o7zAMtxZmU4Q4Afg9WugHKf5f5rmMChhYJAwg/c88hTBZbgAy0VdAJK7Etf9QJoL4HLgsd6TC2AaEwJHP5DcVhpxF6YzFqCzrzia/T6nbkYD9aa9rUHrzHSKoAKGeVMLgOSuzF/7rJJf9z0uV3yCsQvUJej/H8Qb1BIw7GZnVGkNO0Cx72JFvPs/Z1tJEZIFySwoAJBcOSB0DleEOmmOAmvYDnxWvPQrmD00T3p1WgK6QcCZAWmzioFG7cMfdz/T3OC5i03hYHpnB0wjCNA1XigKACQ/Jp0B8GKY0C75nYRn4GrVZ93PKrYJLV3B2js74GwQUGR5N/1Pc6regA2pJWDpKACQXMUODhJHUvLywyfNBljzzHyqtCLWo/2OydE/T8DCGnreX06HcN4UzXPWSZKTIGDgwkPvXOZEgwBFctSdCmjhasVnzVomSgUw9B7nua1Jj6FzcrIgACCZx8DAQd0PCzLwb9IdJZ0HetveLpnyPdtjGSgAkNy50s8DSJMBXan4rPre5MVmkcrdac1DP/XPnggpawGI3ckI9UHbyqX/f5pN8ac3O+ILQ74+wbYMaY6AGLCd2RoFaNCQ0SkAkFxkVX6MYy9y3URAZZTdK12t+GwGHhZDnGdQVMSCeGAd1LOAtUBPxsCLNlS0yRJm2B3NOOnPoECn3+u9/8xaAowH2BGOp4gXYDlpDIDkxgBRAi9FCZEGEVG1liuBT8UzM7uBXEpZsiAv6BkTcGaGwMjbnGSBaX9yeU37m8J2kuTkKYL6Ti8cBQCSuxhI5n0QBeAbuFH1qRkzYhagYQvuIoQUMzqGU0FAv6cIzmrfs1xvzGmOo+9o9O3022wSg4svDgKKcCnKfRQASL4MxImjESsECKzlgVrAim/BLMHd0yz6/y9c1KR90N6Z2QGjNgbct+wYK89jMN5Yr4+5nUGLZ7MDsmcJL8HlXAYaAyC5a+PYLfE8wKwsDYzhRiWg7k0Qh5f9zsrQGYjWMdTAwKIaoVKeSv//NJwaFNCp+O05r0kRKQCQ3IXOcJQ4YufwZtVMuwACCw/UAmrG5vTsdQrQrDyDTZ8NApIRgoCh7v77HeA4Bz7LD3lGd/+jSJLO52FP0lsOyjcgc6MAQHIXOsdenBCTPhmvjNKZAIYrgc/qSC0Ai1SA5nishpNuAAMM08U0TtN/Xm9p5GObc4DWu4xLIDEnXTGTBvmLdMkvGI0BkHy5NADYjU+yAZa3MwDWfI+X1StUPbPYqVTy7v8/l0srGz+YTcbAwjS7L4BsZsCk3+6ynbecKQCQfBlIHLQSSp8OGKBiLQ/XK+lMgFGpcLyftZ0gYEDa4IkG/o2z/CyNMnByiAVGnc9/7rnszAhwZ9MG60tfJAoAJHct59iNYxZ5uNa0VKzhwVqFmmenXDaeU4rn2v8/5DozGZBmwIzy7IAh5vjPvL4fIc/AuH3qZsT9jLj5+1d0aZSfJN3JASNvgjHWk6FpDIDkru3gXuQ6yYCKdCeVn+xd16zhiZUKK16nwMw14UyRzCCZjrUnOQJ6ZweMWoFOY5DivA1z5z+rHXUzBlpGa2GQWVMAILkLHRwmSemTATnSZwI8WKtQsyM2xhWpEC3SsUDPoDOTzxTBor3/ScyqJyRJOg8PytZbppO2uBQASG6ylryWc9yMEtpKHQrAVuBzpRIArdntpKzl7YV5AsY9KdNeb9w+/GnV1jnNP02SznMcsl+V9aIsDo0BkNwlDg7jdCqgwIpneOVKUWcCFOtoxpIFAXbYMQFn1p3k9YlNO2iYwq4nkfTMDnDKGDhvCgBkLhqJ406UkDi3DFXMRCrW8li9QvXCZwKMcpbmfUbnuP9+d5VZngDrnzzCdtxt9W5z4DZGWXj0RYvlogPvubCTbArQBWmDF/YcLBYFAJK7BDhKHLcjRzTvgymAmjU8vlKj6lkW7paoEPP/R9iN53VaAwa1BCxJDTTK4L88Z0Kemh6oJwnOiwIAmYujxHEniolKnAwoKz8r1vL4SpWavagF4JwVZXRZEOANCAL6nuNxpgWOO8Wv36IznJaZx/ayVbsPEOpQEJA7BQAyF4dxwq0w7kwFLK/s3V+t+GzOInsd5Dz/vzib779fk45I75cnYBpN/1Mx4Y4WodfIdXIFlHhK8DwpAJDcOeAwgduRIy53/d+16nk8Vq/gdQYCnrYIJfkCcZ2UwedlDJz66ZtT33/hchdcsMGsO8Bw8rfkQgGAzEXTOXaihEbJWwAyVc/witUq1c40qYUoAxep///ULjv7tKTT0rIgYOC0tBGT2IwyzW3oRaeZuGic7ox+Kwy5kYsWy7oDzhQJKiFmRwFAHxaoGvAXoiRePDFwJ0p4MYwLOPUtfxVjeLhWoTLsOIBhFfXEzv24TPoIZjjJGGg7meouWGWk7Q+7zEizCaa03LjLT6Pv/zxZV0DWHdBzY1C1Bm/u18tyUgDQh2cMVwOPTc9kWa1lipyD/dhxO0yI9FQgap7lFSudqYCnrrZ5Nf8XafL4rJl0QKDnd9LVnr/ISNubeNEczuPIKQZmPZDQkc4RSrr/MgauBZZ13y7klVV0CgD6MEBgTmevlOlJgN044VaYdKcCljEMyC4v3xgeqWXPBCiLKb/XUTPLmZ5jMHRaAobpChh22zmb26UzzW4JTloBkgSDITCGGQ2PLT0FAH0Y0+kCmPeBLKHsHvdu7Hg+immXsebvkb39Td/jasXnpLQ8p9QsSnxQlOMY17nd2KYzRdA/HQSYfisMu+E+y82qWX+YDYwc5IwwXXGI3Q9crpMx0AAVY9UFMCMKAPrwgEueZcWq6WlWDhLHM62Y3U5+9rKf57pneVm9SmCnlBK4qCe0qMcF9wcB855yb/r+Y/x95tnvP8k2ncO6hE3PUrNeoS+bRaUAoA8LbHqWFWt04U1ZdscbOceLYczzbeUDAKgawwPVzkDAuZr3/ufsVBAwShE5g7v/iRXhsxz9GLI1PAebHtTsdHpm5DQFAGec9MnClmdYy/O7WjKxgxdCx/Ptco8DyFSs5XrVx7/wmQD9FOEqneMxTLt2MKYzM2DYIGCaI/pHnJ43yqC9qd/9T+m899mMb2DL9zo3YkW4xpeLAoA+rDFc9j1WPJ2iWTCkUwGfD2O+Esa0S/xgwKxYq1rD1YpPUPRyrujHN7QBb8Q48Oz9YwLG3NxIZtrqPmFXQl4TU1ynJdZPu2Jl+nRWz5H1v277lk3f4nW+/EtT7hXIXuL4QjPmdtnzAThH1RoerFUI+hV2pT05c5K1wtgRgoBBhkk2NNLvR93ONLcxKIAa8oW+yzkqnuFa4HdvxMrcQjgLCgAuULfwoG9YUcE7ddkXuZU4PtcK+UoYE5c4H4ADfGu55HvdgHN4Rbj1HHK9mdzZzugL2rvd82YHjL7BCV8fdpUxj3GYAYczmAxx0Wtbvsd2xSfQTdhMKAC4gA9c8z1WO+kAy1s9zYYhHQfwuWbMnzUijpIy9wMsSAE3tQOc53iBEfafPTMA0iDAP2+K4DCbG6Hyn+jUDKq4h6nYJ+wHmMLMBQd4xrIVeGx6mok1KwoALlAxhkcqHhvqf5odA3fjhI8ft3k2TIhLPhvAGkP9vOtNJWAxWAu+d34QMA3TvKMfdvVp39VPaVuegWsVn+3AUx6AGVHNdo7sWqtYeHn1JB2wTFdW1TcdPHkc8seNiEaJuwEgHfW86g3IST+MIl6wRTymURnTSRs8SsbAnEbSz3I/Y93Vn7fc4GM4mYlleDjwuRr4Y3SLyTAUAPSRDkgzXA88tn2rVJQzYkjP9dPtmN85aHIzjNNMoPM+sDmJEsduFDP8GVig/v9lkCWo93qDgAEd2RfKq+l/2NVyaC4YchN1L50Wu+lrAOCsKAAYYM0aXhZYanZB+mgXTDby/ziB3z0Meeo4pFnasQCO0KV/ltsUv0XzujPMggA762cHzLB1IM8BfSNwGIyBK77lwYrfLXtl+hQADFA3hq+uBaxZFILOiOv8+XI75t/tNvlCK+62DJRJK3bcakf3j4MoSvlXlOOYxKSD+HvXHxgEDJruVrTO+QmOZwoD/7oLGPCN5eFqwKO1AF83XzOjAKCP7GKreYavqfusayDgTBnSsQAfOWjz83cbPN8uTxCQtYIcxAl/vN/gKJ7wXRexpCziMU1DNwg4O0Uwr6b/Mc1l4N8Q/f+dRXxjeLjq82g16E4BlOlTrXYBR3qCHqv4PBhY5aKeoazKuxs7fvFeg3+xc8zN8CQIKEMgcKcd8nv3DjmKYowxOb9nXdxjM5wJAqZxLqfZ1z7mtL6pDfwb1sm6q9bwaK3C1cArzY3APCgAGMKmZ/jauk/dUO5sdTlwwHNhws/sHPMv7hzxbPv0kwKXqSDIAhsDtJKE37l7yJ8eNkmGHgNQhCtxjscwdkQ+7WM2YBxYM2SyoCnd/ef29nMa+NdTvl4JPF5eC6grFftM6exeILtm1zzDt6xV0+lZy1QDFZQDnmkn/JPbx/yPLxzw0aM2x0lyX/DlFvzDyO4V24njo7tH/PNn7/BSOzp991+EOn6q5hkwzHBdRydlsJf+fTYIOO9ufOKBf8MEGoPGIQxabZYDHM9fyBp4qOrzxEqFqvr/Z8qf9wEUnSNNCPTnVgKu+obbodoA8uCAW5HjX99r8vlWyA9sVvnmFZ+HKj5rnkfNM525wYsXBDjSSr+ZJNwLI/7g3hH/9Cu3+eR+Y/J3M9alOePruQxfl7NpgwGSBGY2o2PASc31nI/ZxdBH1VgeqwU8XqvgdYLhMlxC86AAYEjbgeXb1ip8qR3TLOsstZwZ4Ng5fv8o4k8PW7zSxrypYvnq1QqP1irU7DkJmia9c8mhpEkc7IYRX260+djeMR/dO+LZZogbaedFKBIXsfk/B9nAQOgfBEx69z/MaPqhTXAup/IxmFPbuV7xeN1ajXVfDdSzpgBggOy6XLeG71mv8b69Ns/FMWM9sl1GkkX+CbDjLHdbMZ/aP6T2QosKjr7Tg033P6ObasXSf1uRc7QTx1GcECZJsSs0mF5BPy+TBIYXrtLnxSwIMKYTBAxz1zDjofkzOf2TtkScXsAHXlYLeNN6TblXcqAAYAgOCIzhTSs+T1Q9nu88ulZmLzvPxhpcEHBMneMohmYjLVjPM0llOrWKeJi+1/TO56TP/0xjp0q+xWZMOh4AQ77pLad1Rz+j78I5L2edeSue4TWrVZ6oq/k/DwoARrDte3zLWoWPHYfsx06tADlyAMZgggqsrqcjhRrnBAFFvPu/YLOnpzhOuP8ilpRFPKY8GZNeq/iQxBeMCZjmwL8xzWByxEgbdXAl8PmG9TqbvpKv50GdLEPILuG6hT+/GvBgoNM2L86kLQGuvoar1XHGditRZ04q1EX5M54i1KpFOIYFkT1AyE7hIU9D7W9mC59ZddL3crK+A3xreHk94A1rVSq6+8+FarIR+MbwRM3nm9YqVK1yAsyNMRAEsLoGKyudglWKbYrflCLN/x+KSxe1HniW/oNXhtzfOKvPsOFgoo1m4/8cbHiGb9tc4ZFaUPghMctCJeeIrvuW71irsKWcAPNlDPgBrKxCrQ5myT6PIhWARTqWcUxy/FPtFeppCRgpbfCM9RufMvpKI7x+luNGxee7Lq2w4Xu6ucqJAoARrXiG19cD3rAS4Bu1AsxVFgRkLQGTZA2bQ///VBXxIiziMc1F7/Vg0mDVeunfE2xqxBenaLg7+2G35Egf/fudl1f5qtWqKqUc6VyPyGJ4WcXju9crbPoq4eau2x2wCrWVtGCVEcyiPXmGCtP8Py53JmPgsEWwGe4tjNr/P6+m/95lnON6xeddVzfYDnzdVOVIAcAY1jzD6+oBT1R8PJar5XkxZd0BayfdAQunoEXe0sz/L8qGe9az9vy0wdPc3dS3Ob2m/2wWVWAt37Re56tWKqqQcqbzPYbAGJ6oenz7eoVLXkEL7tIx4PvpmIB6fY4DA6fQ/K9LaolckA8iyxMwbBAwyn7msq0RBil2l3E8XPX4/mvrXA68ifYuo1MAMKZrgcc3r1b46pqvZApFkY0JqHcGBg4bBCz6kOOxD3+G73vBT2luhgkCppUioECyvv+atXzzxgpfv17vTv2T/CgAGFPVGl5f9/n2tQpbagUojmxMwKhBwFyNcv3M+1pbxP7/gusNAobKIDmlfU60/sBfDLWJx+sVvu/KOlcDjd2Zh0UoHQvJAA9UPL5zo8Zr6j7BvA9ITixkEFBAS9P/P+Yx9F1tBu+pO0XQm36gU7C4KUt9ve5ZvvfSCt+wXqfe+Y4W7FCXnkrGCVSM4bU1jzdvVLkRWF28RdIbBFTzGhg4hStAF1F5GTqJgjotAaMEMKOO/h/LdI7DOYcHvGalwvdsrfFAxV/axp2iUwAwoW3f463rVd60WqGmi7hYejMG1vtkDJxVyVOgKdkyL2N8OMaA9Ts5LZaw879ju+LxPVurvG6tStVT3/+8KACYkG/gq2sBb1uv8lDFW8Cv4pIzBoLO7IBaEdMGz6v/f8Hm/5eJ4cyzAwZUj3nP/Z+w/79qDW9aq/Edl1a5GqRlpq6s+Shaabhw0r4sw/dsVPjW1QqrY+f5ltk5myxIl30+pvhdKEwCoAm2N9Sqncq+d0zA1PZZjLLp4WrA27fXeMNajYra/udKJeGEsuj10YrHu7fqvLqmiLaYHHj+6WcHFE2RLpoiHcs4ijStfpwdZ48Ntjbn7Jb93vgIc/wvsOZZvu3SCt91aZXL/gwGPMpIClgKLh5H+qTAb1oN+BuX61z3LM4tfhm6dEyWLKhnTEDf57OPvPFzf5ypIs7/z2Hzi2HCLpbeitHz0j/nrjLiOIELFx+wrUG7GvB6YAyvX6vxl6+s84q6nvhXBAoApiDrpdvwLD9wuc5bN6vUl+zhdIsvKwCzMQEraUtAv4I1z2Oa+rKSKtA5GyseMJ0/dGYHeCfbGqaZsSgzAzoeqvm888o637q5Qs1alY8FoABgSrKvwYMVjx/frvPGlQCltigqc5IxsFrTmICzlmb+/7TXn2dAYdIgYNiAdap9/0MMHBzw+oZn+Y7NVd65vcaWUv4Whkq+KbPAm1Yq/Pj2Cq+u+brIi+pUnoBJg4A5NP9LgU15hkV2q9zNGDjhwMBR9j3Ey4NUjOHPrdf5weubvKpe0VekQBQAzMCqZ3jrRoXvv1zjRqBTXFhng4BF6pRU/385nUob3G+Zvv8YtPCYx3TxS69cqfCD1zf58xt1qpolVSiqnWbAAA8GPt+/WeNt6xU2dNEXVxYEZHkCcpsdsGj9//Ns0i/C+5/A1GciDhEEnLfjWaR+6PN69utrgc8PXdvkHVdWWfNV3RSNPpEZsQaeqPm8e2uF71ivUNeZLq7sKYLZo4SLOEUwL0vT/z/mMRSx//+8XXfzBExSyc+u6d8Bm57HD1zb4K9f2+B6Rc9MLaISl3SzV7OGr18N+MHLNd5QC6gs+I3MUstmB9RHDQKm9KHq2iixcYOVM0HATJr+B7Tv97HmWf7C9io/dmOTl9UDDEaXeAEpLJuRbGrgpjW8Zb3GTuw4vOP400ZEPO+Dkz463QFmNf1nowEuGWn1XBS1JC3qceUq55OQdQcYB8kI1+rA7Y6/asUY3ry5wt9/aIvXrlV1l1lg+mxmyADGGK4Elr+4WeMHLtV4pOLppBedN05LwCjm1f8/+7nekjPnSKfp2Z5HCZ/zeY01LXD0VgTfGF6/VuVHHrjEG9erVBd9/MaSU12Uk4cCjx/dWuEHt+rc8PXo4ELr7Q7II21wUS6GohxHr7EqkAL1/8/6nPYmCzK282fCAxrmmM9ZJjDwxrUqf/+hLb778ior1uKMwSgIKCwFADlIWwLgsYrHj2/V+b5LVbY1IrbgTE/GwH5TBDX/v6vs7x+YyTD7oTfZufM3F+XXn1LL0zkveQaeWKnw4w9c4p3ba1zq5PnXZVFsqoVyYjr/eXnV5yevrPJ9m1W2PH09is2cZAys1Rc8Y6CutaVnOg8g6T5KeJxtDPv6yYKBgVfXq/zgtUu8Y3udrcDvNkpIsWkQYM6sgdfVff7rqyt4wPv2WtyMEuXFLqosTwCdgYGt5oSDrTT/f/hd59j8PwvzOhRj0rTBkA5iHbZwGXoK5cnrFQNftVLlh25s8teubvJQVQ/5WSTGuak9Dk1GECaOzzQjfmG3wXvvNXm6FTPFMbwybc5BGELjCJqNnsFXpAXsSE21g3914QtjFbDjNjUPubNJ59+fu80Rt2W6/xljX2O/2H+5oVYbb5rdhQtnPzqXBgCJG+4aHXT+zrxeMYbXrVX44RuX+EtXNnikGtyXlkCKTS0AcxJYw9fWA37Ss6wYw3t2GjwdxkQKx4opawkwq4DpBAEJ3SBg7O1O6fhkAc18hGBndoDrBAMXFC5DBitZvFsxhjeuV/nJB7f4vq01tiu+Kv8FpABgjmxnYOC7L9fxMfzb3SZ/0gxpKQgopm7GwJX031lLQJ4F3yzu/ielgr+YzmuVubDB96K7//Q1B6x6lm/dWOGHb2zwtq01tgNf18CCUhfAnDkgdo4Xw4T/uN/iZ3aO+fhxRFMfS4E5CCM4PobWKMmCCtr833eRUZv/R1hn4DbH2E6RugAmbf4fZbfD7jtJ+o9fuejc9XwWlzzL926v8ZMPXuYb1uuseZrmt8gUABSEw3E7Svit/ZB/dfeY3z5ss5fooymuThDQOIRmc8CdVaagAcDS9P+PeQxTqfzPLJtrADDk2IOsG+C8IGDA+TbG8FDV5y9eWeeHr1/iDetVataONvxFCkddAAVhMFzxLO/YrPBwxbJ955jf2G9xSzMEiskZ8DvJgrA9YwJGoJKzxGb04V9U+QPd1MHdIGDwGBbfGJ5YqfCjD1zir1xZ52W1Cr41qvyXgAKAAjEY1jzDN61WuO5bXl71+YV7DT7fjIjmfXByWtZkGgR0pwJ0ZwdMZeND/3qsbU1rPdUAHQU/Ecb0BAE2zQAzYIqgMbDmebxpvcZPPLDJ27bW2Q402G+ZqAugwO6ECb+23+Q9O8d88jhiP3GaKlhI2RTB4wuCgII2//ddZIGa/7u7n3b//xyb/0fa/Yj7dp3/OPq2WgXG8EAt4Ds3V3n39Q2+5VKdNc/TXf+SUQBQcEex448aIb94t8EHDlp8uR3TzgJ5hs/xIbPWEwScmyxolDniCgBGW36CY1im/v9RBw1mAYBz9JYkq9bw+vU679he5y9dWeOVK1Wquu1fSgoACiyLthMHz4Uxv7bX5Nf3WnyyEXInTLrdAgoECqI3WVC7dbqf9axRK56xy98ZBgCzGP0PCxgAjBLcDbndmQcA6QoGh0vShEFVY3ig6vPNGyv8wPUNvn1zha3A0yj/JaYAYIHsRo5PN0P+w36LD+y3+FwrYj92p5rl9GHOWRYENI9PZww8K5cAYJJ+fAUAyxwApFV/yge2fMvXrVZ46/Yqb9va4GV1n9pCP/tChqEAYFF06pHIOZ4PE546CvnwQYuPHLZ4uhXT7ElKpw90zpyDKBsT0DzJGNirKP3/5y42znpTCgAK0/8/yjYXp/+/t3wwGDY8y2tXq7z50gpvuVTn9Ws1LgceMGKGa1lICgAWkAOO4oSvtGP+4CjkQ/tNnjwKeTFKaJ3JTqsPd156BwaekyegKAGA+v/HebH/srn2/w+/79PlgWPdszxeq/Ctmyt896UVvm69xo2qT2DSsQHOqPIvAwUAi6gTmicO9uOEZ8KYTxyHvH+vye8ehdyOEkIFAgWQJQvqbQlAAwAv3OaiBQDzbP7vWXjAZZMO/HfUPcvLqwFvubzKd2+t8pqVKjcqHitWGf3KSAHAEkgcHCYJz7Zjnjpq82v7LZ48CrkTJbQVCMxfeKY7QAMAL9iuAoBJA4DTlX7684pnebDi8d2XV3jr1jqvW6vyQMWjZg1G9/qlpQBgiSRAM3E8F8Z87Cji1/caPHnU5mboOM7SCisYyFf29Yrj9NkBWcbAUSreXAOARez/H/MYFr7/v2fhs+N/nMOYtI//kVrAWy6t8I6tVV6zWmM78Kh0pvWp6i83BQBLqpU4XooSPtUIed9ei985bPN8GHOQOD1yOE/OnVRsUdjzAKEhkwVd8OvBxulrVvP/wvX/90b0xlGzlk3P8qp6he/dWuV7L6/wqnqVS77XzeKnAX4CCgCWUu+XO3KO3djxxVbEfzoM+chhiy+0Iu6ECXsJtF06jfDsRaBWglnojAlo9ssYOM3m/yFWVvP/OC/2X26GAcD530eDMeAZqFnDZd/jRsXjdas1vuPSCn9urcZDNZ8Nz+uuoYpfeikAWGKnv+yO4wR2ophPNyI+0Qj5k0bEM+2IF0LHTpTQSBxxZ3DheXoLDl004+oZGNg+mzFw3v3/c2z+h9IHAObMy/3aiCzpA3rWPMvVqs9DFY+X1yq8cb3GG1arPF6vcMn3TmXvU8Uv51EAUAJnv/yRS4OB/Tjm862YTzYiPt+MeK4dcyuKeSlMuBs72g4SHLFLgwI3Tv0g9+vmCWicCQIWLQCYY+Xf3f2Yx9B3tVk2/6cLXljg9tzqZ3f3FoNvYM1atioeVwKPG4HPo7WAr1mt8Ya1Ko9UA9Y8Q93a7ql0ZzYpcpYCgBI5r0CInaORwFHiuBXFfKUd83Qr5rl2zAthzO3IsRsn3IkS7sVJJyiAGJcGBdD9u7sPXVEXMwyXLIjzfzX8TkZ9edSgwTK1D9uMuK3ucYx5DH3f6jDZ77KQeowAwHBq1L0BrDFY49K/Ac8Y6tawHaSV/WXf43rF55FqwMPVtOJ/rBpwObDUrT1V6WdHN8ohSXkpACip8woJB4TOEbp0NsGtMOZW5LgbJdyOEnbimHuRYy9Og4HjxNFMYC9OugMLQ+c46PxeF9YgPUFAuz1CsqBhqP9/uPWHfuHi5YZYzWK45HvUe0bg1720Kb9qDZu+x7pn2Q48Nj3LlYrP1YrHtu9xveKxHfhUjSGwBv/M+VKlL+NQACB9Cw/nIOrpAoiA4zjhIHEcxAkNlw4iPIgT4s46kUtbE1oKAIbkIIrSQGCIMYGzNcfqY5ZdHXkYeBgGa2DDO+mbN0DVGlY8Q2As655hxbNs+paqtXikrQGeAf9Md4c7tWWR8SgAkPsMuptwpMGBw3W7AHoX7u0SkCHpaziBglSBFx5G+vlaTqfdMaSNH6b7c/+0PLrLl2lTACADzf3GVKREdHcvefHnfQBSfKMWQoooRfob9H1SpS95UQAgU6cCTESk+IaZ8yIiIiJLRgGAiIhICSkAEBERKSEFACIiIiWkAEBERKSEFACIiIiUkAIAERGRElIAICIiUkIKAEREREpIAYCIiEgJKQAQEREpIQUAIiIiJaQAQEREpIQUAIiIiJSQAgAREZESUgAgIiJSQgoARERESkgBgIiISAkpABARESkhBQAiIiIlpABARESkhBQAiIiIlJACABERkRJSACAiIlJCCgBERERKSAGAiIhICSkAEBERKSEFACIiIiWkAEBERKSEFACIiIiUkAIAERGRElIAICIiUkIKAEREREpIAYCIiEgJKQAQEREpIQUAIiIiJaQAQEREpIQUAIiIiJSQAgAREZESUgAgIiJSQgoARERESkgBgIiISAkpABARESkhBQAiIiIlpABARESkhBQAiIiIlJACABERkRJSACAiIlJCCgBERERKSAGAiIhICSkAEBERKSEFACIiIiWkAEBERKSEFACIiIiUkAIAERGRElIAICIiUkIKAEREREpIAYCIiEgJKQAQEREpIQUAIiIiJaQAQEREpIQUAIiIiJSQAgAREZESUgAgIiJSQgoARERESkgBgIiISAkpABARESkhBQAiIiIlpABARESkhBQAiIiIlJACABERkRJSACAiIlJCCgBERERK6P8HEipK+T6BtJoAAAAASUVORK5CYII=',
      // urls: [files.image1, files.image2]
    };

    try {
      const ShareResponse = await Share.open(shareOptions);
      console.log(JSON.stringify(ShareResponse));
    } catch (error) {
      console.log('Error => ', error);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 1, marginBottom: 10}}>
          <View style={{marginTop: 20}}>
            <FlatList
              data={this.state.dataSource}
              keyExtractor={item => item.num}
              extraData={this.state}
              renderItem={({item}) => {
                return (
                  <View style={{flex: 1}}>
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        //height:200,
                        flexDirection: 'row',
                        padding: 10,
                        borderBottomWidth: 1,
                        borderStyle: 'solid',
                        borderColor: '#ecf0f1',
                      }}
                      onPress={() => {
                        this.press(item);
                      }}>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                        }}>
                        {item.check ? (
                          <Text
                            style={{
                              fontWeight: '800',
                              fontFamily: 'Heiti SC',
                            }}>{`${item.num} `}</Text>
                        ) : (
                          <Text>{`${item.num}`}</Text>
                        )}
                      </View>
                      <View
                        style={{
                          flex: 1,
                          alignItems: 'flex-end',
                          justifyContent: 'center',
                        }}>
                        {item.check ? (
                          <Icon
                            name="checkbox-marked-circle"
                            size={30}
                            color={primaryColor}
                          />
                        ) : (
                          <Icon
                            name="checkbox-blank-circle-outline"
                            size={30}
                            color={darkGrey}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View style={{marginBottom: 20}}>
          {this.state.SelectedFakeContactList.length > 0 ? (
            <View style={styles.containerFooter}>
              <View
                style={{
                  flex: 3,
                  //  backgroundColor:'red',
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <FlatList
                  data={this.state.SelectedFakeContactList}
                  horizontal={true}
                  extraData={this.state}
                  keyExtractor={(item, index) => item.num}
                  renderItem={({item, index}) => {
                    return (
                      <View
                        style={{
                          paddingTop: 10,
                          flex: 1,
                        }}>
                        <Text
                          style={{
                            color: 'white',
                            fontWeight: 'bold',
                            padding: 2,
                          }}>
                          {`${item.num},`}
                        </Text>
                      </View>
                    );
                  }}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                }}>
                <TouchableOpacity
                  style={{
                    padding: 10,
                    marginLeft: 30,
                    marginTop: -8,
                  }}
                  onPress={item => this.myCustomShare(item)}>
                  <Icon name="send" size={30} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </View>
      </View>
    );
  }
}

const primaryColor = '#25CCF7';
const lightGrey = '#ecf0f1';
const darkGrey = '#bdc3c7';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 20,
    paddingBottom: 0,
  },
  containerFooter: {
    height: 50,
    backgroundColor: '#25CCF7',
    padding: 5,
    flexDirection: 'row',
  },
  searchContainer: {
    padding: 1,
    marginHorizontal: 10,

    backgroundColor: '#ecf0f1',
    borderRadius: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  modalView: {
    margin: 20,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    width: 200,
    marginBottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

// import React, {Component} from 'react';
// import {StyleSheet, Text, View, ScrollView} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import {database} from '../Setup';

// export default class GroupScreen extends Component {
//   state = {
//     dataSource: [],
//   };
//   componentDidMount() {
//     const mydata = database().ref('meetups/');
//     mydata.on('value', datasnap => {
//       if (datasnap.val()) {
//         this.setState({dataSource: Object.values(datasnap.val())});
//       }
//     });
//   }
//   render() {
//     return (
//       <LinearGradient colors={['#25CCF7', '#4834DF']} style={{flex: 1}}>
//         <ScrollView contentContainerStyle={styles.container}>
//           {this.state.dataSource.map(item => {
//             return (
//               <View
//                 style={{
//                   width: '90%',
//                   margin: 10,
//                   backgroundColor: '#ffff',

//                   borderRadius: 10,
//                   padding: 5,
//                   shadowColor: '#ccc',
//                   shadowOffset: {
//                     width: 0,
//                     height: 2,
//                   },
//                   shadowRadius: 5,
//                   shadowOpacity: 0.2,
//                 }}>
//                 <View style={{flex: 1, padding: 10}}>
//                   <Text style={styles.text}>{item.num}</Text>

//                   <Text style={styles.text}>
//                     {' '}
//                     {new Date(item.time).toDateString()}
//                   </Text>
//                 </View>
//               </View>
//             );
//           })}
//         </ScrollView>
//       </LinearGradient>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   textStyle: {
//     fontWeight: 'bold',
//     letterSpacing: 0.2,
//   },
//   text: {
//     marginBottom: 5,
//     fontSize: 15,
//   },
// });



