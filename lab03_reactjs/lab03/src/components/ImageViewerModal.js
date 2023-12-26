// ImageViewerModal.js
import React from 'react';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-width: 80%;
  max-height: 80%;
  background-color: white;
  border: 1px solid #ddd;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
  display: block;
  margin: 0 auto;
`;

function ImageViewerModal({ imageUrl, onClose }) {
    return (
        <ModalContainer>
            <CloseButton onClick={onClose}>Close</CloseButton>
            <Image src={imageUrl} alt="Large Image" />
        </ModalContainer>
    );
}

export default ImageViewerModal;
