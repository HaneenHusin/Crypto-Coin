import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

 const CustomButton = styled(Button)({
  backgroundColor: '#2a7f06', 
  color: '#fff',
  '&:hover': {
    backgroundColor: '#35af02',
  },
});

export default CustomButton;