import * as React from 'react';
import { styled, ButtonBase, AvatarUser } from '@splitshare/ui';
import ReceiptQueryContainer from '../../graphql/ReceiptQuery';
import getCurrencySymbol from '../../utils/getCurrencySymbol';

interface IProps {
  onCancel: () => void;
  receiptId: string | null;
}

const WrapStyled = styled.div`
  position: absolute;
  top: 25px;
  left: 0;
  background: #f9faff;
  bottom: 0;
  right: 0;
`;

const ReceiptOverlay = ({ receiptId, onCancel }: IProps) => {
  return (
    <WrapStyled>
      <ReceiptQueryContainer receiptId={receiptId || ''}>
        {({ receipt }) =>
          receipt ? (
            <div>
              <h3>{receipt.company}</h3>
              {receipt.splits.map(s => (
                <div
                  key={s.id}
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    margin: '15px 0',
                  }}
                >
                  <AvatarUser name={s.user.displayName || s.user.email} />
                  <span style={{ margin: '0 8px' }}>
                    {s.user.displayName || s.user.email}
                  </span>
                  <span>
                    {s.value}
                    {getCurrencySymbol(s.currency)}
                  </span>
                </div>
              ))}
              <ButtonBase onClick={onCancel}>Cancel</ButtonBase>
            </div>
          ) : null
        }
      </ReceiptQueryContainer>
    </WrapStyled>
  );
};

export default ReceiptOverlay;
