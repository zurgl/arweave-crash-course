import { Alert, Space, Typography, Popover, Button } from 'antd';
import { useAppState } from '../hooks'
import type { EntryT, AlertT } from '../types';

const { Text, Paragraph } = Typography;

const Nav = () => {
    const { state } = useAppState();
    const { address } = state;
    const networkId = 'arweave.testnet'

    const displaySecretKey = (address: string) => `${(address).slice(0,5)}...${(address).slice(-5)}`
    const displayNetworkId = (networkId: string) => networkId

    const Entry = ({ msg, display, value }: EntryT) => {
        return (
            <Paragraph copyable={{ text: value }}>
                <Text strong>{msg}</Text>
                <Text code>{display(value)}</Text>
            </Paragraph>
        )
    }

    const AppState = () => {
        return (
        <>
            <Entry msg={"Network: "} value={networkId} display={displayNetworkId} />
            {address && <Entry msg={"Address: "} value={address} display={displaySecretKey} />}
        </>
        )
    }

    return (
        <div style={{ position: "fixed", top: 20, right: 20 }}>
            <Popover content={AppState} placement="rightBottom">
                <Button type="primary">Storage</Button>
            </Popover>
        </div>
    )
}

const Notify = ({ msg, status }: {msg: string, status: AlertT }) => 
    <Alert
        message={
            <Space>
                <Text strong>{msg}</Text>
            </Space>
        }
        type={status}
        showIcon
    />

export { Nav, Notify }
