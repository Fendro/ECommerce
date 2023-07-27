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

export const ProductContainer = styled(Container)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '90%',
});

export const ProductImage = styled(Image)({

});

export function AnyText(props) {
	const style = {
		width: props.width + "%",
		borderColor: "lightgrey"
	};
	return (
		<div style={style}>
			{props.text}
		</div>
	);
}

export function AnyImage(props) {
	const style = {
		width: props.width + "%",
		borderColor: "lightgrey"
	};
	return (
		<img style={style} alt={props.alt}></img>
	);
}