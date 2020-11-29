import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';

import Constants from '../../Utils/constants';
import ModBusService from '../../services/modbus';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 20,
  },
  fileName: {
    fontWeight: 'bold',
    marginTop: 5,
  },
  instructions: {
    color: '#DDD',
    fontSize: 14,
    marginTop: 20,
    textAlign: 'center',
  },
  info: {
    color: '#DDD',
    fontSize: 14,
    textAlign: 'center',
  },
  logo: {
    height: Dimensions.get('window').height * 0.11,
    marginVertical: Dimensions.get('window').height * 0.11,
    width: Dimensions.get('window').height * 0.11 * (1950 / 662),
  },
  welcome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  sets: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  margins: {
    marginTop: 40,
  },
  marginleft: {
    margin: 10,
  },
});
export default function Main() {
  const [infosystem, setInfoSystem] = useState([]);
  const [infoRegisters, setInfoRegisters] = useState([]);
  const [ant, setAnt] = useState(false);

  useEffect(() => {
    setInterval(() => {
      async function GetModbus() {
        await ModBusService.GetData()
          .then((response) => {
            console.log(response.data.Registers);
            setInfoSystem(response.data.Coils);
            setInfoRegisters(response.data.Registers);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      GetModbus();
    }, 1000);
  }, []);

  async function HandleStartSystem() {
    await ModBusService.WriteCoil(
      Constants.setStartSystem,
      infosystem[0] == 1 ? 0 : 1,
    );
    console.log(infoRegisters);
    await ModBusService.WriteRegister(
      Constants.count,
      infoRegisters[0] >= 1 ? 0 : 1,
    );
  }

  async function HandleSetRegisters(addr, value, min) {
    if (min) {
      if (value >= 0) {
        await ModBusService.WriteRegister(addr, value);
      }
    } else {
      await ModBusService.WriteRegister(addr, value);
    }
  }

  return (
    <ImageBackground
      source={{
        uri: 'https://s3-sa-east-1.amazonaws.com/rocketseat-cdn/background.png',
      }}
      style={styles.container}
      resizeMode="cover">
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <Text style={styles.welcome}>Bem-vindo ao sistema de monitoramento!</Text>
      <Text style={styles.instructions}>Informativo do sistema:</Text>

      <Button title={'Liga/Desliga sistema'} onPress={HandleStartSystem} />
      <Text style={styles.instructions}>
        InfoSystem: {infosystem[1] == 1 ? 'true' : 'false'} - Addr:{' '}
        {Constants.getSystem}
      </Text>

      <Text style={styles.instructions}>
        RedLamp: {infosystem[3] == 1 ? 'true' : 'false'} - Addr:{' '}
        {Constants.getRed}
      </Text>
      <Text style={styles.instructions}>
        YellowLamp: {infosystem[4] == 1 ? 'true' : 'false'} - Addr:{' '}
        {Constants.getYellow}
      </Text>
      <Text style={styles.instructions}>
        GreenLap: {infosystem[2] == 1 ? 'true' : 'false'} - Addr:{' '}
        {Constants.getGreen}
      </Text>

      <View style={styles.margins}>
        <Text style={styles.info}>Red</Text>
        <View style={styles.sets}>
          <Button
            title={'Menos'}
            onPress={() =>
              HandleSetRegisters(
                Constants.setTimeRed,
                infoRegisters[1] - 1,
                true,
              )
            }
          />
          <View style={styles.marginleft}>
            <Text style={styles.info}>
              SetTime: {infoRegisters[1]} - Addr: {Constants.setTimeRed}
            </Text>
            <Text style={styles.info}>
              RemainingTime: {infoRegisters[2]} - Addr: {Constants.getTimeRed}
            </Text>
          </View>
          <Button
            title={'Mais'}
            onPress={() =>
              HandleSetRegisters(
                Constants.setTimeRed,
                infoRegisters[1] + 1,
                false,
              )
            }
          />
        </View>
      </View>

      <View style={styles.margins}>
        <Text style={styles.info}>Yellow</Text>
        <View style={styles.sets}>
          <Button
            title={'Menos'}
            onPress={() =>
              HandleSetRegisters(
                Constants.setTimeYellow,
                infoRegisters[5] - 1,
                true,
              )
            }
          />
          <View style={styles.marginleft}>
            <Text style={styles.info}>
              SetTime: {infoRegisters[5]} - Addr: {Constants.setTimeYellow}
            </Text>
            <Text style={styles.info}>
              RemainingTime: {infoRegisters[6]} - Addr:{' '}
              {Constants.getTimeYellow}
            </Text>
          </View>
          <Button
            title={'Mais'}
            onPress={() =>
              HandleSetRegisters(
                Constants.setTimeYellow,
                infoRegisters[5] + 1,
                false,
              )
            }
          />
        </View>
      </View>

      <View style={styles.margins}>
        <Text style={styles.info}>Green</Text>
        <View style={styles.sets}>
          <Button
            title={'Menos'}
            onPress={() =>
              HandleSetRegisters(
                Constants.setTimeGreen,
                infoRegisters[3] - 1,
                true,
              )
            }
          />
          <View style={styles.marginleft}>
            <Text style={styles.info}>
              SetTime: {infoRegisters[3]} - Addr: {Constants.setTimeGreen}
            </Text>
            <Text style={styles.info}>
              RemainingTime: {infoRegisters[4]} - Addr: {Constants.getTimeGreen}
            </Text>
          </View>
          <Button
            title={'Mais'}
            onPress={() =>
              HandleSetRegisters(
                Constants.setTimeGreen,
                infoRegisters[3] + 1,
                false,
              )
            }
          />
        </View>
      </View>
    </ImageBackground>
  );
}
