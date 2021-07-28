import { Alert, Button, Col, Space, Typography } from 'antd';
import { useAppState } from 'hooks'
import Arweave from 'arweave'

const { Text } = Typography;

type downloadBoxT = {
    wallet: string,
    address: string
}
const DownloadBox = ({ wallet, address }: downloadBoxT) => {
    return (
        <Button>
            <a
                href={`data:text/json;charset=utf-8,${encodeURIComponent(
                    JSON.stringify(wallet)
                )}`}
                download={`arweave-${address}.json`}
            >
                {`Download Json`}
            </a>
        </Button>
    )
}

const Wallet = () => {
    const {state, dispatch} = useAppState();
    const { host, port, protocol } = state;

    const generateKeypair = async () => {
        const arweave = Arweave.init({ host, port, protocol })
        const wallet = await arweave.wallets.generate()
        const address = await arweave.wallets.jwkToAddress(wallet)

        dispatch({
            type: 'SetWallet',
            wallet: JSON.stringify(wallet)
        })
        dispatch({
            type: 'SetAddress',
            address: address
        })
    }
    const publicKeyStr = state?.address

    const KeyPairStatusBox = () =>
        <Col>
            <Space direction="vertical">
                <Alert
                    message={
                        <Space>
                            <Text strong>Wallet generated!</Text>
                        </Space>
                    }
                    description={
                        <div>
                            <div>
                                A string representation of the wallet address 
                                <Text code>{publicKeyStr}</Text>.
                            </div>
                            <Text>Accessible (and copyable) at the top right of this page.</Text>
                        </div>
                    }
                    type="success"
                    showIcon
                />
            </Space>
        </Col>
    
    return (
    <>
        <Col>
            <Space direction="vertical" size="middle" >        
                <Button type="primary" onClick={generateKeypair} style={{ marginBottom: "20px" }}>
                    Generate a Wallet
                </Button>
                {state?.address && <KeyPairStatusBox />}
                {state?.address && <DownloadBox wallet={state.wallet as string} address={state.address} /> }
            </Space>
        </Col>
    </>
    );
}

export default Wallet
