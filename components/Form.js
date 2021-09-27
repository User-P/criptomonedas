import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, TouchableHighlight, Alert } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'

const Form = ({ coin, crypto, setCoin, setCrypto, setQueryApi }) => {
    const [cryptos, setCryptos] = useState([])

    useEffect(() => {
        const queryApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD'
            const result = await axios.get(url)
            setCryptos(result.data.Data)
            console.log(cryptos)
        }
        queryApi()
    }, [])

    const currentCoin = coin => {
        setCoin(coin)

    }

    const currentCrypto = crypto => {
        setCrypto(crypto)
    }

    const quotePrice = () => {
        if (coin.trim() === '' || crypto.trim() === '') {
            showAlert()
            return;
        }
        setQueryApi(true)

    }

    const showAlert = () => {
        Alert.alert(
            'Error',
            'Ambos campos son obligatorios...',
            [
                { text: 'OK' }
            ]
        )

    }

    return (
        <View>
            <Text style={styles.label}> Moneda </Text>
            <Picker
                selectedValue={coin}
                onValueChange={coin => currentCoin(coin)}
            >
                <Picker.Item label="-Seleccione-" value="" />
                <Picker.Item label="Dolar EEUU" value="USD" />
                <Picker.Item label="Peso MXN" value="MXN" />
                <Picker.Item label="Euro" value="EUR" />
                <Picker.Item label="Libra Esterlina" value="gbp" />
            </Picker>
            <Text style={styles.label}> Cryptomoneda </Text>
            <Picker
                selectedValue={crypto}
                onValueChange={crypto => currentCrypto(crypto)}
            >

                <Picker.Item label="-Seleccione-" value="" />
                {cryptos.map(crypto => (
                    <Picker.Item
                        key={crypto.CoinInfo.Id}
                        label={crypto.CoinInfo.FullName}
                        value={crypto.CoinInfo.Name}
                    />
                ))}
            </Picker>

            <TouchableHighlight
                style={styles.btnQuote}
                onPress={() => quotePrice()}
            >
                <Text style={styles.textQuote}>Cotizar</Text>
            </TouchableHighlight>

        </View >
    )
}

const styles = StyleSheet.create({
    label: {
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        fontSize: 20,
        marginVertical: 20
    },
    textQuote: {
        fontSize: 18,
        color: '#FFF',
        fontFamily: 'Lato-Black',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    btnQuote: {
        backgroundColor: '#5E49E2',
        padding: 10,
        marginTop: 20,
        marginHorizontal: '2.5%'
    }
});

export default Form