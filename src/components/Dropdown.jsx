import React from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import { AppContext } from "../AppContext";

export default function Dropdown() {
  const options = ['Any cuisine', 'American', 'Brazilian', 'British', 'Caribbean', 'Chinese', 'French', 'Greek', 'Indian', 'Italian', 'Japanese', 'Korean', 'Mediterranean', 'Mexican', 'Middle Eastern', 'Peruvian', 'Spanish', 'Thai', 'Vietnamese'];
  /* This is a React functional component that creates a button with a dropdown menu. 
  The useState hook is used to set the initial state of open and selectedIndex to false and 0, respectively. 
  The anchorRef is used to reference the button. */
  const [open, setOpen] = React.useState(false)
  const anchorRef = React.useRef(null)
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const { filterData, updateFilter } = React.useContext(AppContext)

  /*These are functions that handle click events for the button and menu items, 
  toggling the state of open and selectedIndex, and closing the menu when a user clicks outside of it.*/

  const handleClick = () => {
    console.info(`You clicked ${options[selectedIndex]}`)
  };

  const handleMenuItemClick = (event, index) => {
    const { name, value } = event.currentTarget.dataset
    setSelectedIndex(index);
    setOpen(false);
    updateFilter(name, value)
    console.log(filterData)
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  }

  return (
    /* creates a ButtonGroup component, which contains two buttons: 
    a main button that displays the currently selected option, 
    and a secondary button that opens a dropdown menu containing the list of options. */
    <React.Fragment>
      <ButtonGroup ref={anchorRef} aria-label="split button">
        <Button onClick={handleClick}>{options[selectedIndex]}</Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>

       {/* creates a Popper component, which is a material design component that creates a popover element to 
       display the options in the dropdown menu. The Popper component is conditionally rendered based on the state 
       of the open variable. */
       }
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (

            // The grow component animates the drop down menu
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            {/*The Paper component contains the dropdown menu, which is created using a MenuList component and 
            a series of MenuItem components. When a MenuItem is clicked, the handleMenuItemClick function is called, 
            which updates the selectedIndex state variable to the index of the clicked MenuItem, and closes the dropdown menu.*/
            }
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      data-name="cuisine"
                      data-value={option}
                      selected={index === selectedIndex}
                      onClick={(event) => handleMenuItemClick(event, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  )
}