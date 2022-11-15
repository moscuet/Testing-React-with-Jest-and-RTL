import { render, screen, fireEvent } from '@testing-library/react';
import { logRoles } from '@testing-library/dom'
import App from './App';
import {replaceCamelWithSpace} from './components/TestButtonCheckbox'

test('button has correct initial color', () => {
  const { container } = render(<App />)
  // log all elements with role
  logRoles(container)

  // find an element with role button and text ' change to blue'
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })

  // expect back ground color to be red
  expect(colorButton).toHaveStyle({ backgroundColor: 'MediumViolet' })

});


test('button turns blue when click', () => {
  render(<App />)
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  // click button
  fireEvent.click(colorButton);

  // expect background color to be blue
  expect(colorButton).toHaveStyle({ backgroundColor: 'blue' })

  // expect the button text change to 'Change to red'
  expect(colorButton).toHaveTextContent('Change to Medium Violet')

});


// color button , check button
test(' initial conditions', () => {
  render(<App />)

  // button starts out enabled
  const colorButton = screen.getByRole('button', { name: 'Change to blue' })
  expect(colorButton).toBeEnabled()

  // checkbox start out unchecked

  const checkbox = screen.getByRole('checkbox')
  expect(checkbox).not.toBeChecked()

})

test(' button disabled and color gray when checkbox checked && button enable and active color when checkbox unchecked ', () => {
  render(<App />)

  const checkbox = screen.getByRole('checkbox',{name:'disable button'})
  const colorButton = screen.getByRole('button', { name: 'Change to blue'})

  // checking checkbox turn colorbutton disabled and bg color gray
 
  fireEvent.click(checkbox)

  expect(colorButton).toBeDisabled()
  expect(colorButton).toHaveStyle({backgroundColor: 'gray'})
  
  // // unchecking checkbox turn colorbutton enabled
  
  fireEvent.click(checkbox)

  expect(colorButton).toBeEnabled()
  expect(colorButton).toHaveStyle({backgroundColor: 'MediumViolet'})

})

// unit testing

describe ('spacs before camel-case capital letters', () => {
  test('works for no capital letter', ()=>{
     expect(replaceCamelWithSpace('Green')).toBe('Green')
  });

  test('works for one capital letter', ()=>{
    expect(replaceCamelWithSpace('BackgroundColor')).toBe('Background Color')
    
  });

  test('works for multiple capital letter', ()=>{
    expect(replaceCamelWithSpace('OneTwoThree')).toBe('One Two Three')
  })

})