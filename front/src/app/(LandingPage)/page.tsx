'use client';
import React, { useReducer } from 'react';
import Style from './page.module.scss';
import Image from 'next/image';
import HeaderImage from '../../../public/headerImg.jpg';
import {
  Alert,
  Box,
  Container,
  Snackbar,
  ThemeProvider,
  Typography,
} from '@mui/material';
import InitialCardForm from '@/components/InitialCardForm/InitialCardForm';
import FormCard from '@/components/CardForm/FormCard';
import { LightTheme } from '@/themes';
import NavBar from '@/components/NavBar/NavBar';
import AboutToolList from '@/components/AboutToolList/AboutToolList';
import ServiceCardList from '@/components/ServiceCard/ServiceCardList';
import Footer from '@/components/Footer/Footer';
import { ActionLandingPage, StateLandinPage } from '@/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';

const Reducer = (state: StateLandinPage, action: ActionLandingPage) => {
  switch (action.type) {
    case 'SET_FORM':
      return {
        ...state,
        dataCompany: { ...state.dataCompany, ...action.payload },
      };
    case 'SET_CARD':
      return { ...state, card: action.payload };
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, ...action.payload } };
    default:
      return state;
  }
};

const LandingPage = () => {
  const InitialArgs = {
    dataCompany: {
      name: '',
      email: '',
      tel: '',
      cep: '',
      institutionName: '',
      cnpj: '',
      position: '',
      segment: '',
      momentEnterprise: '',
      statusClinicalEng: 'Própria',
      momentCME: 'Implementação',
    },
    card: 'initial',
    errors: {
      validate: false,
      snackbarError: false,
      firstSubmitError: '',
    },
  };

  const [state, dispatch] = useReducer(Reducer, InitialArgs);

  //Responsável por renderizar o componente correto
  const renderCardForm = (card: string) => {
    switch (card) {
      case 'initial':
        return <InitialCardForm dispatch={dispatch} />;
      case 'form':
        return <FormCard state={state} dispatch={dispatch} />;
      default:
        break;
    }
  };

  const queryClient = new QueryClient();

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY || ''}
    >
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={LightTheme}>
          <NavBar />
          <Box component="header" className={Style.header}>
            <Image
              src={HeaderImage}
              alt="CME"
              priority
              className={Style.header__img}
              fill
            />
            <Box className={Style.header__title}>
              <Typography variant="h2" fontWeight="900" color="white">
                Não espere mais para transformar a gestão do seu hospital!
              </Typography>
            </Box>
            <Box display="flex" justifyContent="center">
              <Box className={Style.header__subTitle}>
                <Typography variant="h5" fontWeight="600">
                  Otimize a gestão de recursos com nossa ferramenta de cálculo
                  de CME
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box component="section" className={Style.cardForm}>
            <Container maxWidth="lg" className={Style.cardForm__card}>
              {renderCardForm(state.card)}
            </Container>
          </Box>
          {state.card != 'initial' ? (
            <Container maxWidth="lg" className={Style.aboutTool}>
              <Typography
                variant="h6"
                fontWeight="600"
                textAlign="center"
                color={'white'}
              >
                Descubra a revolução na Gestão de Materiais Hospitalares com
                Nossa Ferramenta de Cálculo de CME
              </Typography>
              <AboutToolList />
            </Container>
          ) : (
            ''
          )}
          <Container className={Style.serviceCards}>
            <Typography
              variant="h5"
              fontWeight="600"
              textAlign="center"
              color={'white'}
              marginBottom={'2vh'}
            >
              A importância de garantir equipamentos adequados
            </Typography>
            <ServiceCardList />
          </Container>
          <Footer />
          <Snackbar open={state.errors.snackbarError} autoHideDuration={5000}>
            <Alert
              onClose={() =>
                dispatch({
                  type: 'SET_ERROR',
                  payload: { firstSubmitError: '', snackbarError: false },
                })
              }
              severity="error"
              variant="filled"
              sx={{ width: '100%' }}
            >
              {state.errors.firstSubmitError}
            </Alert>
          </Snackbar>
        </ThemeProvider>
      </QueryClientProvider>
    </GoogleReCaptchaProvider>
  );
};

export default LandingPage;
