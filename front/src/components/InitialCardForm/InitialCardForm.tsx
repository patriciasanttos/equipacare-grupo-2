import React from 'react';
import Style from './index.module.scss';
import { Box, Button, Typography } from '@mui/material';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import AboutToolList from '../AboutToolList/AboutToolList';
import { ActionLandingPage } from '@/types';

interface PropsInitialCardForm {
  dispatch: React.Dispatch<ActionLandingPage>;
}

const InitialCardForm = ({ dispatch }: PropsInitialCardForm) => {
  return (
    <>
      <Box display="flex" flexDirection="column">
        <Typography
          variant="subtitle2"
          className={Style.initialCardForm__title}
          fontWeight="600"
          textAlign="center"
        >
          Você pode testar a ferramenta gratuitamente uma vez.
        </Typography>
        <Typography
          variant="subtitle1"
          className={Style.initialCardForm__subTitle}
          fontWeight="600"
          textAlign="center"
        >
          Após isso, caso queira obter análises mais detalhadas, um de nossos
          consultores entrará em contato via e-mail.
        </Typography>
      </Box>
      <Box textAlign="center" paddingY={'2vh'}>
        <Button
          variant="contained"
          size="large"
          endIcon={<KeyboardArrowRightRoundedIcon />}
          className={Style.initialCardForm__button}
          onClick={() => dispatch({ type: 'SET_CARD', payload: 'form' })}
        >
          Teste Grátis
        </Button>
      </Box>
      <Typography variant="h6" fontWeight="600" textAlign="center">
        Descubra a revolução na Gestão de Materiais Hospitalares com Nossa
        Ferramenta de Cálculo de CME
      </Typography>
      <AboutToolList />
    </>
  );
};

export default InitialCardForm;
