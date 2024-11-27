import { BeatLoader } from 'react-spinners';

export default function Loading({ loading }: { loading: boolean }) {
	return <BeatLoader loading={loading} color="#fff" />;
}
