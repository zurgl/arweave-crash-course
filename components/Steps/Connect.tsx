import { useEffect, useState } from 'react';
import axios from "axios";
import { Alert, Col, Space, Typography } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

import { useAppState } from 'hooks'

const { Text } = Typography;

const Connect = () => {
	const [version, setVersion] = useState<string>('');
	const [fetchingVersion, setFetchingVersion] = useState<boolean>(false);
    const { state } = useAppState();

	useEffect(() => {
        const getConnection = () => {
            setFetchingVersion(true)
            axios
                .post(`/api/arweave/connect`, state)
                .then(res => {
                    setVersion(res.data)
                    setFetchingVersion(false)
                })
                .catch(err => {
                    console.error(err)
                    setFetchingVersion(false)
                })
        }
        getConnection()
    }, [state]);

	return (
		<Col style={{ width: "100%" }}>
			{fetchingVersion
				? <LoadingOutlined style={{ fontSize: 24 }} spin />
				: version.length != 0
					? <Alert
							message={
								<Space>
                                Connected to Arweave!
									<Text code>{version}</Text>
								</Space>
							}
							type="success"
							showIcon
						/>
                    : <Alert message={`Not connected to Arweave ${'testnet'}`} type="error" showIcon />}
		</Col>
	);
}

export default Connect
