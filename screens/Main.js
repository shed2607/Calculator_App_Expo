import { StyleSheet, Text, View, TouchableOpacity, Switch, SafeAreaView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'

const Main = () => {
    const [result, setResult] = useState('')
    const [finalResult, setFinalResult] = useState('')
    const [darkMode, setDarkMode] = useState(false)



    const handleBtnPress = (value) => {
        if (value === '=') {
            // Evaluate the expression and set the result
            try {
                const res = eval(result)
                setFinalResult(res.toString())
            } catch (error) {
                setFinalResult('Invalid Expression')
            }
        } else if (value === 'AC') {
            setResult('')
            setFinalResult('')
        } else if (value === "+/-") {
            if (result === "") {
                // If no value is present, add a negative sign and set result state to "-"
                setResult("-");
            } else {
                let v = String(Number(result) * -1)
                setResult(`(${v})`);
            }
        } else if (value === '%') {
            // If a value is present, convert it to a percentage
            if (result === "") {
                // If no value is present, set result state to "0%"
                setResult("0%");
            } else {
                // If a value is present, convert it to a percentage
                setResult(String(Number(result) / 100));
            }
        } else if (value === 'x') {
            setResult(result + '*')
        }
        else {
            setResult(result + value)
        }
    }


    const renderBtn = (value, btnStyle, btnStyle2) => {
        return (
            <TouchableOpacity
                onPress={() => handleBtnPress(value)}
                style={[styles.btn, btnStyle2, darkMode && { backgroundColor: '#000', borderColor: '#fff' },]}
            >
                <Text
                    style={[styles.btnText, btnStyle, darkMode && { color: '#fff' },]}
                >
                    {value}
                </Text>
            </TouchableOpacity>
        )
    }


    const toggleDarkMode = () => {
        setDarkMode(!darkMode)
    }



    return (
        <SafeAreaView style={[styles.container, { backgroundColor: darkMode ? '#111' : '#fff' }]}>
            <StatusBar style={darkMode ? 'light' : 'dark'} />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '90%',
                    marginTop: 20,
                }}
            >
                <View
                    style={{
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',

                    }}>
                    <Text style={[styles.mainText, { fontWeight: 'bold', }, darkMode && { color: '#fff' }]}>Calc-E </Text>
                    <Text style={[styles.mainText, { opacity: 0.5, fontSize: 15 }, darkMode && { color: '#fff' }]}>Calculator </Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: darkMode ? '#fff' : '#000', marginRight: 10 }}>
                        {darkMode ? 'Dark' : 'Light'} mode
                    </Text>
                    <Switch
                        value={darkMode}
                        onValueChange={toggleDarkMode}
                    />
                </View>


            </View>
            <View
                style={[
                    styles.resultCon,
                    { borderColor: darkMode ? '#fff' : '#333' },
                ]}
            >
                <Text style={[styles.restultText2, darkMode && { color: '#fff' }]}>{finalResult}</Text>
                <Text style={[styles.restultText,darkMode && { color: '#fff' }]}>{result}</Text>
            </View>

            <View>
                <View style={{ flexDirection: 'row' }}>
                    {renderBtn('AC', { color: '#36919D' })}
                    {renderBtn('+/-', { color: '#36919D' })}
                    {renderBtn('%', { color: '#36919D' })}
                    {renderBtn('/', { color: '#B67723' })}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {renderBtn('7')}
                    {renderBtn('8')}
                    {renderBtn('9')}
                    {renderBtn('x', { color: '#B67723' })}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {renderBtn('4')}
                    {renderBtn('5')}
                    {renderBtn('6')}
                    {renderBtn('-', { color: '#B67723' })}
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {renderBtn('1')}
                    {renderBtn('2')}
                    {renderBtn('3')}
                    {renderBtn('+', { color: '#B67723' })}
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {renderBtn('0', {}, { width: 150, })}
                    {renderBtn('.')}
                    {renderBtn('=', { color: '#B67723' })}
                </View>
            </View>


        </SafeAreaView>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        width: 70,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderWidth: 3,
    },
    btnText: {
        color: '#000',
        fontSize: 30,
    },
    resultCon: {
        borderWidth: 5,
        borderColor: '#333',
        width: '90%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 15,
        padding: 10,
        marginVertical: '10%',
    },
    restultText: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    restultText2: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#000',
        opacity: 0.5
    },
    mainText: {
        fontSize: 30,
        color: '#000',
    }

})