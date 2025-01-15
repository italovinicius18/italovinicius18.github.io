// Certification.tsx

import React from 'react';
import type { CertificationType } from '../types';

interface CertificationProps {
  certification: CertificationType;
  language: 'en' | 'pt';
}

const Certification: React.FC<CertificationProps> = ({
  certification,
  language,
}) => {
  const { name, issuer, tags } = certification;

  return (
    <div className="certification">
      <p>
        <strong>{name[language]}</strong>
        {issuer && ` - ${issuer[language]}`}
      </p>

      {/* Exibir as tags, se existirem */}
      {tags && tags.length > 0 && (
        <p style={{ fontStyle: 'italic', color: '#ccc' }}>
          Tags: {tags.join(', ')}
        </p>
      )}
    </div>
  );
};

export default Certification;
