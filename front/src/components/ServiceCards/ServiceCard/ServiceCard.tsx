import React from 'react';
import Style from './index.module.scss';

interface ServiceCardProps {
  image: string;
  alt: string;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ image, alt }) => {
  return (
    <div>
      <img src={image} alt={alt} />
    </div>
  );
};
