import React, { useState } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Demo.css';

// "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

const Demo = () => {
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
		<div>
			<div style={{ width: '100%' }}>
				<Button variant='primary' onClick={handleShow}>
					Add image
				</Button>
				{/* <button style={{ float: 'right' }} onClick={getCropData}>
					Crop Image
				</button> */}
				<br />
				<br />
				<Modal show={show} onHide={handleClose} animation={false}>
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
						<Button variant='secondary' onClick={handleClose}>
							Close
						</Button>
						<Button variant='primary' onSubmit={handleClose}>
							Save Changes
						</Button>
						<Button
							style={{ float: 'right' }}
							onClick={()=>{getCropData(), handleClose();}}
						>
							Crop Image
						</Button>
					</Modal.Footer>
				</Modal>

				<div
					className='box'
					style={{ width: '50%', float: 'right', height: '300px' }}
				>
					<img
						style={{ width: '100%' }}
						src={cropData}
						alt='cropped'
					/>
				</div>
			</div>
			<div></div>
			<br style={{ clear: 'both' }} />
		</div>
	);
};

export default Demo;
