import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import Header from './components/Header'
import Form from './components/Form';
import axios from 'axios';
import Quote from './components/Quote'

const App = () => {

  const [coin, setCoin] = useState('')
  const [crypto, setCrypto] = useState('')
  const [queryApi, setQueryApi] = useState(false)
  const [result, setResult] = useState({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const quoteCrypto = async () => {
      if (queryApi) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${crypto}&tsyms=${coin}`
        const result = await axios.get(url)
        setLoading(true)
        setTimeout(() => {
          setResult(result.data.DISPLAY[crypto][coin])
          setQueryApi(false)
          setLoading(false)
        }, 3000);

      }
    }
    quoteCrypto()
  }, [queryApi])

  const componet = loading ? <ActivityIndicator size="large" color="#5E49E2"/> : <Quote result={result} />
  return (
    <>
      <ScrollView>

        <Header />
        <Image
          style={styles.image}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.content}>
          <Form
            coin={coin}
            crypto={crypto}
            setCoin={setCoin}
            setCrypto={setCrypto}
            setQueryApi={setQueryApi}
          />
        </View>
        <View style={{marginTop:40}}>
        {componet}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    marginHorizontal: '2.5%'
  },
  content: {
    marginHorizontal: '2.5%'
  }
});

export default App;
