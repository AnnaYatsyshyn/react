import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ThumbnailLink from './ThumbnailLink';
import ImageViewerModal from './ImageViewerModal';
import Filters from './Filters';
import Pagination from './Pagination';
import styled from 'styled-components';

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

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

function DataTable() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isViewerOpen, setIsViewerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Кількість елементів на сторінці

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        // Фільтруємо дані за кількістю слів в полі title (менше або рівно 7)
        const filtered = data.filter((item) => {
            const titleWords = item.title.split(' ');
            return titleWords.length <= 7;
        });

        setFilteredData(filtered);
    }, [data]);

    const handleFilter = (albumFilter, titleFilter) => {
        let filtered = data;

        if (albumFilter) {
            filtered = filtered.filter((item) => item.albumId.toString() === albumFilter);
        }

        if (titleFilter) {
            filtered = filtered.filter((item) =>
                item.title.toLowerCase().includes(titleFilter.toLowerCase())
            );
        }

        setFilteredData(filtered);
    };

    const handleSort = (sortType) => {
        let sortedData = [...filteredData];
        if (sortType === 'id') {
            sortedData.sort((a, b) => a.id - b.id);
        } else if (sortType === 'title') {
            sortedData.sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                }
                if (a.title > b.title) {
                    return 1;
                }
                return 0;
            });
        }
        setFilteredData(sortedData);
    };

    // Логіка для пагінації
    const totalItems = filteredData.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const openImageViewer = (largeUrl) => {
        setSelectedImage(largeUrl);
        setIsViewerOpen(true);
    };

    const closeImageViewer = () => {
        setSelectedImage(null);
        setIsViewerOpen(false);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePreviousPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div>
            <Filters onFilter={handleFilter} onSort={handleSort} />
            <Table>
                <thead>
                <tr>
                    <Th>ID</Th>
                    <Th>Title</Th>
                    <Th>Thumbnail</Th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((item) => (
                    <tr key={item.id}>
                        <Td>{item.id}</Td>
                        <Td>{item.title}</Td>
                        <Td>
                            <ThumbnailLink
                                thumbnailUrl={item.thumbnailUrl}
                                largeUrl={item.url}
                                onThumbnailClick={openImageViewer}
                            />
                        </Td>
                    </tr>
                ))}
                </tbody>
            </Table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onNext={handleNextPage}
                onPrevious={handlePreviousPage}
            />
            {isViewerOpen && (
                <ImageViewerModal imageUrl={selectedImage} onClose={closeImageViewer} />
            )}
        </div>
    );
}

export default DataTable;
