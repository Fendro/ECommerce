import { Box, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import  placeh from './asset/placeholder.png';

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


export function ArticleContainer(props) {
	const style = {
		marginTop: "3%",
		marginRight: "auto",
		marginLeft: "auto",
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'center',
		width: '90%',
		flexWrap: "wrap",
		backgroundColor: "#EEE0C0",
		color: "black",
	};
	if (props?.link) {
		const linkStyle = {
			textDecoration: 'inherit',
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


export function AnyText({width, color, children}) {
	const style = {
		width: width + "%",
		border: "1px solid grey",
		margin: "1px",
		padding: "1px",
	};
	if (!children)
		return;
	if (color)
		style.color = color;
	return (
		<div style={style}>
			{children}
		</div>
	);
}


export function AnyImage(props) {
	const style = {
		width: props.width + "%",
		aspectRatio: 5 / 3,
		border: "1px solid grey",
		margin: "1px",
		padding: "1px",
	};
	return (
		<img style={style} alt={props.alt ?? "image"} src={
			props.bin ? "data:image/jpeg;base64," + props.bin
			: props.url ? props.url
			: placeh
		}></img>
	);
}


export function AnyDiv(props) {
	return <div style={{width: props.width + "%"}} >{props.children}</div>;	
}


export const TopCenterContainer = styled(Container)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
});


export function Linebreak() {
	return <div style={{width: "100%", height: 0}} />;	
} 