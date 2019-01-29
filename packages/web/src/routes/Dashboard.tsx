import * as React from 'react';
import { RouteComponentProps, Link } from '@reach/router';
import {
  styled,
  ButtonBase,
  LayoutTopBar,
  TopBarLeft,
  TopBarRight,
  LayoutPage,
  CardBillBig,
} from '@splitshare/ui';
import PageModal, { PageModalInner } from '../components/PageModal';
import BillNewOverlay from './dashboard/BillNewOverlay';
import ReceiptNewOverlay from './dashboard/ReceiptNewOverlay';
import SvgSplit from 'src/components/icons/Split';
import MenuProfile from '../components/MenuProfile';
import MenuInvites from '../components/MenuInvites';
import MyBillsQueryContainer from '../graphql/MyBillsQuery';

interface IState {
  showBillNewOverlay: boolean;
  showReceiptNewOverlay: boolean;
}

const ButtonsWrapStyled = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonStyled: any = styled(ButtonBase)`
  padding: 50px;
  border: 1px solid #eee;
  border-radius: 6px;
  margin: 0 15px;

  &:hover {
    opacity: 0.5;
  }
`;

const LogoLinkStyled = styled(Link)`
  text-decoration: none;
  display: flex;
  align-items: center;

  svg {
    display: inline-block;
    margin-right: 5px;
  }
`;

const SectionWrapStyled = styled.div`
  margin: 45px;

  h3 {
    margin-bottom: 25px;
  }
`;

const ScrollWrapStyled = styled.div`
  overflow: auto;
  white-space: nowrap;
  padding-bottom: 25px;

  & > a {
    margin-right: 25px;
    width: 200px;
  }
`;

export default class Dashboard extends React.PureComponent<
  RouteComponentProps,
  IState
> {
  state = {
    showBillNewOverlay: false,
    showReceiptNewOverlay: false,
  };

  toggleBillNewOverlay = () => {
    this.setState(state => ({ showBillNewOverlay: !state.showBillNewOverlay }));
  };

  toggleReceiptNewOverlay = () => {
    this.setState(state => ({
      showReceiptNewOverlay: !state.showReceiptNewOverlay,
    }));
  };

  render() {
    const { showBillNewOverlay, showReceiptNewOverlay } = this.state;

    return (
      <>
        <LayoutPage>
          <LayoutTopBar>
            <TopBarLeft>
              <LogoLinkStyled to="/">
                <SvgSplit />
                Split Share
              </LogoLinkStyled>
            </TopBarLeft>
            <TopBarRight>
              <MenuInvites />
              <MenuProfile />
            </TopBarRight>
          </LayoutTopBar>
          <SectionWrapStyled>
            <MyBillsQueryContainer>
              {({ bills }) => (
                <>
                  <h3>Your bills ({bills.length})</h3>
                  <ScrollWrapStyled>
                    {bills.map(bill => (
                      <CardBillBig
                        key={bill.id}
                        title={bill.name}
                        users={bill.users}
                        to={`/${bill.id}`}
                        updatedAt={bill.updatedAt}
                      />
                    ))}
                  </ScrollWrapStyled>
                </>
              )}
            </MyBillsQueryContainer>
          </SectionWrapStyled>
          <ButtonsWrapStyled>
            <ButtonStyled onClick={this.toggleBillNewOverlay}>
              Add new bill
            </ButtonStyled>
            <ButtonStyled onClick={this.toggleReceiptNewOverlay}>
              Add new receipt
            </ButtonStyled>
          </ButtonsWrapStyled>
        </LayoutPage>
        {showBillNewOverlay ? (
          <PageModal>
            <PageModalInner>
              <BillNewOverlay onCancel={this.toggleBillNewOverlay} />
            </PageModalInner>
          </PageModal>
        ) : null}
        {showReceiptNewOverlay ? (
          <PageModal>
            <PageModalInner>
              <ReceiptNewOverlay onCancel={this.toggleReceiptNewOverlay} />
            </PageModalInner>
          </PageModal>
        ) : null}
      </>
    );
  }
}
