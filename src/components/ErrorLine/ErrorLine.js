import { Component } from 'react'
import NavigatorOnline from 'react-navigator-online'
import { ToastContainer, toast } from 'react-toastify'

export default class ErrorLine extends Component {
  showMessage(status) {
    if (status) {
      toast.success('now! you have an internet connection.')
    } else {
      toast.error('now! you have no internet connection.')
    }
  }
  render() {
    return (
      <>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnVisibilityChange
          draggable
          pauseOnHover
          onClose={() => alert('ok')}
        />
        <NavigatorOnline onChange={(status) => this.showMessage(status)} />
      </>
    )
  }
}
