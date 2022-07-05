import React, { useState } from 'react'
import { User, GlobeStand, SignOut } from 'phosphor-react'

const Dashboard = () => {
  const [showDrop, setShowDrop] = useState(true)
  return (
    <div className='dash-area'>
      <div className="circle-wrapper">
        <div className="success circle"></div>
        <div className="icon">
          <GlobeStand size={32} color="#fff" weight='fill' />
        </div>
      </div>
      <div>
        <User size={32} color="#302b63" weight="duotone" />
        {showDrop &&
          <div className='panel-dropdown'>
            <div className='verify-2fa-group'>
              <h3>Toggle 2FA Mode</h3>
              <div className='switch-toggle'>
                <h6>Off</h6>
                <label className="switch">
                  <input
                    type="checkbox"
                    // onChange={handleToggleDarkmode}
                    // checked={darkmode}
                    placeholder="light"
                  />
                  <span className="slider round"></span>
                </label>
                <h6>On</h6>
              </div>
            </div>
            <div className='logout'> <SignOut size={20} color="#fff" weight="bold" /> Logout </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Dashboard