import { Box, Container, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import placeh from './asset/placeholder.png';

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


export function ArticleContainer({ link, children }) {
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
	if (link) {
		const linkStyle = {
			textDecoration: 'inherit',
		}
		return (
			<Link style={Object.assign({}, style, linkStyle)} to={link}>
				{children}
			</Link>
		);
	} else {
		return (
			<div style={style}>
				{children}
			</div>
		);
	}
}


export function AnyText({ width, color, children }) {
	if (!children)
		return;

	const style = {
		width: width ? width - 1 + "%" : "99%",
		color: color ? color : "inherited",
		border: "1px solid grey",
		margin: "1px",
		padding: "1px",
	};

	return (
		<div style={style}>
			{children}
		</div>
	);
}


export function AnyImage({ width, url, alt }) {
	const style = {
		width: width ? width - 1 + "%" : "99%",
		aspectRatio: 5 / 3,
		border: "1px solid grey",
		margin: "1px",
		padding: "1px",
	};
	return (
		<img style={style} alt={alt ?? "image"} src={url ?? placeh}></img>
	);
}


export function AnyDiv({ width, children }) {
	return <div style={{ width: width + "%" }} >{children}</div>;
}


export const TopCenterContainer = styled(Container)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	width: '100%',
});


export function Linebreak() {
	return <div style={{ width: "100%", height: 0 }} />;
}



