import { useState } from 'react';
import './App.css';
import mainPoster from './assets/poster.png';
import html2canvas from 'html2canvas';

import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function App() {
	const [img, setImg] = useState();
	function handleChange(e) {
		console.log(e.target.files);
		setImg(URL.createObjectURL(e.target.files[0]));
	}

	const [name, setName] = useState('');
	const [company ,setCompany] = useState('');

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(name);
	};
	const printDocument = () => {
		const demo = document.getElementById('divToPrint');
		html2canvas(demo, { scale: 2 }).then((canvas) => {
			var link = document.createElement('a');
			document.body.appendChild(link);
			link.download = 'image.png';
			link.href = canvas.toDataURL('image/png');
			link.target = '_blank';
			link.click();
		});
	};


		const [show, setShow] = useState(false);
		const handleClose = () => setShow(false);

		const handleShow = () => setShow(true);
		const [image, setImage] = useState();
		const [cropData, setCropData] = useState();
		const [cropper, setCropper] = useState();
		const onChange = (e) => {
			e.preventDefault();
			let files;
			if (e.dataTransfer) {
				files = e.dataTransfer.files;
			} else if (e.target) {
				files = e.target.files;
			}
			const reader = new FileReader();
			reader.onload = () => {
				setImage(reader.result);
			};
			reader.readAsDataURL(files[0]);
		};

		const getCropData = () => {
			if (typeof cropper !== 'undefined') {
				setCropData(cropper.getCroppedCanvas().toDataURL());
			}
		};

	return (
		<div className='mb-5'>
			<div
				id='divToPrint'
				style={{ height: '600px', width: '600px' }}
				className='download'
			>
				<div className='main-part'>
					<div>
						<img
							className='position-absolute'
							style={{ opacity: '1.0' }}
							width={'600px'}
							src={mainPoster}
							onChange={handleChange}
							alt=''
						/>
					</div>

					<div style={{ width: '100%' }}>
						<Modal
							show={show}
							onHide={handleClose}
							animation={false}
						>
							<Modal.Header closeButton>
								<Modal.Title>Modal heading</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								<input type='file' onChange={onChange} />
								<Cropper
									style={{ height: 400, width: '100%' }}
									zoomTo={0.5}
									minCropBoxHeight={1}
									minCropBoxWidth={1}
									src={image}
									onInitialized={(instance) => {
										setCropper(instance);
									}}
									guides={true}
								/>
							</Modal.Body>
							<Modal.Footer>
								<Button
									variant='secondary'
									onClick={handleClose}
								>
									Close
								</Button>
								<Button
									// style={{ float: 'left' }}
									onClick={() => {
										getCropData(), handleClose();
									}}
								>
									Crop Image
								</Button>
							</Modal.Footer>
						</Modal>

						<div
							className='box'
							// style={{
							// 	width: '50%',
							// 	float: 'right',
							// 	height: '300px',
							// }}
						>
							<img
								style={{ width: '100%' }}
								src={cropData}
								alt=''
							/>
						</div>
					</div>

					<h6 className='text mt-1 ml-5'>{name}</h6>
					<h6 className='text mt-1 ml-5'>{company}</h6>
				</div>
			</div>

			<Button
				variant='primary'
				style={{ marginLeft: '10px', marginTop: '10px' }}
				onClick={handleShow}
			>
				Add image
			</Button>
			<Button
				style={{ marginLeft: '10px', marginTop: '10px' }}
				onClick={printDocument}
			>
				Print
			</Button>

			<form onSubmit={handleSubmit}>
				<label>
					Enter your name:{' '}
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</label>
				<input type='submit' />
			</form>

			<form onSubmit={handleSubmit}>
				<label>
					Enter your company name:{' '}
					<input
						type='text'
						value={company}
						onChange={(e) => setCompany(e.target.value)}
					/>
				</label>
				<input type='submit' />
			</form>

	
		</div>
	);
}

export default App;

