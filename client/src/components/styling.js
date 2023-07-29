import { Box, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const CenteredContainer = styled(Container)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100vh',
});

export const FormContainer = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
	boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
	borderRadius: '8px',
	backgroundColor: 'darkorange',
	width: '600px',
	height: 'auto',
});

export const StyledInput = styled(TextField)({
	marginBottom: '30px',
	'& .MuiOutlinedInput-root': {
		background: 'white',
		'&:hover .MuiOutlinedInput-notchedOutline': {
			borderColor: 'white',
		},
		'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
			borderColor: 'black',
		},
	},
});

export const StyledLink = styled(Link)({
	marginTop: '50px',
});

export function ProductContainer(props) {
	const style = {
		marginTop: "3%",
		marginRight: "auto",
		marginLeft: "auto",
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'center',
		width: '90%',
		flexWrap: "wrap"
	};
	if (props?.link) {
		const linkStyle = {
			textDecoration: 'inherit',
			color: 'inherit',
		}
		return (
			<Link style={Object.assign({},style, linkStyle)} to={props.link}>
				{props.children}
			</Link>
		);
	} else {
		return (
			<div style={style}>
				{props.children}
			</div>
		);
	}
}

export function AnyText(props) {
	const style = {
		width: props.width + "%",
		borderColor: "grey",
		border: "1px solid",
		margin: "1px",
		padding: "1px",
	};
	if (!props?.text)
		return;
	return (
		<div style={style}>
			{props.text}
		</div>
	);
}

export function AnyImage(props) {
	const style = {
		width: props.width + "%",
		aspectRatio: 4 / 3,
		borderColor: "grey",
		border: "1px solid",
		margin: "1px",
		padding: "1px",
	};
	return (
		<img style={style} alt={props.alt ?? "image"}></img>
	);
}
export const TopCenterContainer = styled(Container)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
});