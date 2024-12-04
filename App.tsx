import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {  TextInput, Button } from 'react-native';
import {
    ClientBuilder,
    ClientError,
    SlidingSyncVersionBuilder,
} from '@unomed/react-native-matrix-sdk';
import RNFS from 'react-native-fs';
import * as React from 'react';

export default function App() {
    const [homeserver, setHomeserver] = React.useState('matrix.org');
    const [status, setStatus] = React.useState('');

    const updateHomeserverLoginDetails = React.useCallback(async () => {
        if (!homeserver.length) {
            setStatus('');
            return;
        }

        try {
            const tempDir = RNFS.TemporaryDirectoryPath;
            console.log('Temp dir:' + tempDir);
            const dataDir = RNFS.DocumentDirectoryPath + '/data';
            const cacheDir = RNFS.DocumentDirectoryPath + '/cache';

            const client = await new ClientBuilder()
                .serverNameOrHomeserverUrl(homeserver)
                .sessionPaths(dataDir, cacheDir)
                .slidingSyncVersionBuilder(new SlidingSyncVersionBuilder.Native())
                .build();
            const loginDetails = await client.homeserverLoginDetails();

            const sv = await client.availableSlidingSyncVersions();

            setStatus('OK');

            // await client.login('xx', 'xxx', 'foo', 'foo');
            // setStatus('LOGGED IN');
            // client.session();
            // const syncService = await client.syncService().finish();
            // await syncService.start();            

        } catch (e) {
            if (e instanceof ClientError.Generic) {
                console.log(e.inner);
                setStatus(e.inner.msg.toString());
            } else {
                console.log(e);
                setStatus('Error');
            }
        }
    }, [homeserver]);

    return (
        <View style={styles.container}>
            <TextInput value={homeserver} onChangeText={setHomeserver}></TextInput>
            <Button title="Go" onPress={updateHomeserverLoginDetails}></Button>
            <Text>{status}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
