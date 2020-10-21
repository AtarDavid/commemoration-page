import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Heading } from './Headings';
import { screen, font } from '../helpers/variables';

export default function HeaderImage(props) {
  const { content } = props;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const headerImage = React.createRef();

  useEffect(() => {
    window.onscroll = () => {
      headerImage.current.style.backgroundPositionY = `${
        window.pageYOffset * 0.3
      }px`;
    };

    const updateWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [headerImage]);

  return (
    <StyledHeaderImage
      ref={headerImage}
      backgroundImage={content.response?.img.size}
      width={windowWidth}
    >
      <div>
        <div>
          {content.response?.title && (
            <Heading h1 title={content.response.title} />
          )}
          {content.response?.subTtitle && <p>{content.response.subTtitle}</p>}
        </div>
      </div>
    </StyledHeaderImage>
  );
}

const StyledHeaderImage = styled.header`
  background-image: url(${(props) => props.backgroundImage?.large});
  background-position: top;
  background-size: cover;
  height: calc(${(props) => props.width}px / 4.5);
  width: 100%;

  @media (max-width: ${screen.desktop}) {
    height: calc(${(props) => props.width}px / 4);
  }

  @media (max-width: ${screen.tablet}) {
    background-image: url(${(props) => props.backgroundImage?.medium});
    height: calc(${(props) => props.width}px / 3);
  }

  @media (max-width: ${screen.mobile}) {
    background-image: url(${(props) => props.backgroundImage?.small});
    height: calc(${(props) => props.width}px / 2);
  }

  & > div {
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;

    div {
      text-align: center;
      text-shadow: 0px 0px 10px rgba(0, 0, 0, 1);

      h1 {
        color: #fff;
        font-size: calc(${font.size.normal} * 3);
        margin: 16px;

        @media (max-width: ${screen.tablet}) {
          font-size: calc(${font.size.normal} * 2.5);
        }

        @media (max-width: ${screen.mobile}) {
          font-size: calc(${font.size.normal} * 2);
        }
      }

      p {
        color: #fff;
      }
    }
  }
`;
