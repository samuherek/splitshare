import * as React from 'react';
import styled from '../../styles/styled-components';
import * as emoji from './emoji.json';

type ToggleDropdownFn = () => void;

export interface IProps {
  render: (
    toggleDropdown: ToggleDropdownFn,
    isOpen: boolean
  ) => React.ReactNode;
  onSelect: (value: string) => void;
}

interface Emoji {
  emoji?: string;
  description?: string;
  category?: string;
  aliases?: string[];
  tags?: string[];
  unicode_version?: string;
  ios_version?: string;
}

export interface IState {
  isOpen: boolean;
  search: string;
  emojis: Emoji[];
}

const WrapStyled: any = styled.div`
  position: relative;
`;

const InnerWrapStyled = styled.div`
  flex-grow: 1;
  min-height: 0px;
  transform: translateZ(0px);
  overflow: hidden auto;
  padding: 0 12px;
`;

const PickerWrapStyled = styled.div`
  position: absolute;
  top: 100%;
  background: white;
  z-index: 999;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  width: 444px;
  min-width: 180px;
  max-width: calc(100vw - 24px);
  height: 356px;
  max-height: 70vh;
`;

const CollectionWrapStyled = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  background: transparent;
  padding: 0px 12px;
  margin-bottom: 1px;
`;

const EmojiStyled = styled.span`
  cursor: pointer;
  user-select: none;
  transition: background 120ms ease-in 0s;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
  width: 32px;
  height: 32px;
  font-size: 24px;

  &:hover {
    background: rgba(55, 53, 47, 0.08);
  }
`;

export class DropdownEmoji extends React.PureComponent<IProps, IState> {
  state = {
    isOpen: false,
    search: '',
    emojis: [],
  };

  componentDidMount() {
    const emojis = emoji.slice(0, 250);
    this.setState({ emojis });
  }

  toggleDropdown = () => this.setState(state => ({ isOpen: !state.isOpen }));

  handleSelect = (ev: React.SyntheticEvent<HTMLSpanElement>) => {
    this.props.onSelect(ev.currentTarget.innerHTML);
    this.toggleDropdown();
  };

  render() {
    const { isOpen, emojis } = this.state;
    const { render } = this.props;

    return (
      <WrapStyled>
        {render(this.toggleDropdown, isOpen)}
        {isOpen ? (
          <PickerWrapStyled>
            <InnerWrapStyled>
              <CollectionWrapStyled>
                {emojis.map((e: Emoji, i) => (
                  <EmojiStyled
                    key={i}
                    onClick={this.handleSelect}
                    role="button"
                    tabIndex={0}
                  >
                    {e.emoji}
                  </EmojiStyled>
                ))}
              </CollectionWrapStyled>
            </InnerWrapStyled>
          </PickerWrapStyled>
        ) : null}
      </WrapStyled>
    );
  }
}
