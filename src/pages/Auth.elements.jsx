import styled from 'styled-components';

export const Section = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
`;
export const ImgBox = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  overflow: auto;

  @media screen and (max-width: 48rem) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;
export const Image = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: center/cover
    url('https://images.pexels.com/photos/2447036/pexels-photo-2447036.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260');
`;
export const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  z-index: 100;

  @media screen and (max-width: 48rem) {
    width: 100%;
  }
`;
export const Contents = styled.div`
  background: rgb(255 255 255 / 0.9);
  padding: 1rem 2rem;
  margin: 3rem;
  border-radius: 10px;
  box-shadow: 0px 0px 20px grey;
`;
export const Title = styled.h2`
  font-weight: bold;
  font-size: 2em;
  text-transform: uppercase;
  display: inline-block;
  letter-spacing: 1px;
  margin-bottom: 2.5rem;
  z-index: 1;
`;
export const SocialBtns = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 6rem;
  width: 100%;
  padding-bottom: 1rem;
`;
export const SignUp = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const AdminBtn = styled.div`
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
