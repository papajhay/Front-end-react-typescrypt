import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { TextField, InputAdornment, IconButton, Box, MenuItem, Select, FormControl, SelectChangeEvent  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useIntl } from 'react-intl';
import { useLanguage } from '../LanguageProvider';

interface NavBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  switchLanguage: (locale: 'en' | 'fr') => void;
}

const NavBarContainer = styled.nav`
  background-color: #f8f9fa;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.img`
  cursor: pointer;
  width: 90px;
  height: auto;
`;

const SearchField = styled(TextField)`
  margin-right: 20px;
  width: 300px;
`;

const NavButton = styled.button`
  border-radius: 50px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  padding: 5px 15px;
  font-size: 14px;
  cursor: pointer;

  svg {
    margin-right: 5px;
  }
`;

const SignupButton = styled(NavButton)`
  background-color: white;
  border: 1px solid #28a745;
  color: #28a745;
  margin-left: 20px;

  &:hover {
    background-color: #28a745;
    color: white;
  }
`;

const LoginButton = styled(NavButton)`
  background-color: white;
  border: 1px solid #007bff;
  color: #007bff;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const FlagImage = styled.img`
  width: 24px;
  height: auto;
  margin-right: 5px;
`;

const NavBar: React.FC<NavBarProps> = ({ searchQuery, setSearchQuery }) => {
  const navigate = useNavigate();
  const { switchLanguage } = useLanguage();
  const intl = useIntl();
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr'>('en');

  const handleLogoClick = () => {
    navigate('/');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

   const handleLanguageChange = (event: SelectChangeEvent<"en" | "fr">) => {
    const selectedLanguage = event.target.value as "en" | "fr"; 
    setCurrentLanguage(selectedLanguage);
    switchLanguage(selectedLanguage);
  };

  return (
    <NavBarContainer>
      <Logo
        src='../../../assets/images/mechanic.jpg'
        alt='logo'
        onClick={handleLogoClick}
      />
      <Box
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          flexGrow: 1, 
          alignItems: 'center' 
        }}
      >
        <SearchField
          variant="outlined"
          placeholder={intl.formatMessage({ id: 'header.search' })}
          size="small"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton onClick={handleSearch} edge="start">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: '16px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '16px', 
            },
          }}
        />
      </Box>
      <Box
        sx={{ 
          display: 'flex', 
          alignItems: 'center',
          gap: 1 
        }}
      >
        <FormControl variant="outlined" size="small">
          <Select
            value={currentLanguage}
            onChange={handleLanguageChange}
            // Personnaliser l'affichage du Select avec renderValue
            renderValue={() => (
              <FlagImage
                src={currentLanguage === 'en' ? "/assets/flags/eng.jpg" : "/assets/flags/fr.jpg"}
                alt={currentLanguage === 'en' ? "English" : "French"}
              />
            )}
          >
            <MenuItem value="en">
              <FlagImage src="/assets/flags/eng.jpg" alt="English" /> English
            </MenuItem>
            <MenuItem value="fr">
              <FlagImage src="/assets/flags/fr.jpg" alt="French" /> French
            </MenuItem>
          </Select>
        </FormControl>
        
        <SignupButton onClick={handleSignup}>
          <PersonAdd />
          {intl.formatMessage({ id: 'header.signup' })}
        </SignupButton>
        <LoginButton onClick={handleLogin}>
          <AccountCircle />
          {intl.formatMessage({ id: 'header.signin' })}
        </LoginButton>
      </Box>
    </NavBarContainer>
  );
};

export default NavBar;


