import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";

interface AddEntityButtonPropsI {
	onClick?: () => void;
	header: string;
}
export default function AddEntityButton({
	onClick = () => {},
	header,
}: AddEntityButtonPropsI) {
	return (
		<Button
			type="dashed"
			onClick={() => onClick()}
			block
			icon={<PlusOutlined />}
		>
			{header}
		</Button>
	);
}
