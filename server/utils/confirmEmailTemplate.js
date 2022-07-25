const confirmEmailMessage = (url) => `
<style type="text/css">
@import url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap');
</style>
<table align="center" bgcolor="#ECF2F8" cellpadding="0" cellspacing="0" width="600">
<tbody>
    <tr>
        <td align="center" bgcolor="#ECF2F8" width="600">
            <div>&nbsp;</div>
            <img alt="Artic Air Logo" height="auto" src="https://i.ibb.co/51V0kQt/logoi.png"
                style="width: 60px; height: auto; border: none; outline: none;" width="60px" />
            <div>&nbsp;</div>
        </td>
    </tr>
    <tr>
        <td align="center" bgcolor="#ECF2F8" width="600">
            <table align="center" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0"
                style="box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);" width="500">
                <tbody>
                    <tr>
                        <td align="center" bgcolor="#FFFFFF" width="500">
                            <div>&nbsp;</div>

                            <div>&nbsp;</div>

                            <table align="center" bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" width="460">
                                <tbody>
                                    <tr>
                                        <td align="center" bgcolor="#FFFFFF" width="460">
                                            <div
                                                style="font-size: 24px; line-height: 1.2; letter-spacing: 0px; font-family: 'Roboto', sans-serif; font-weight: 500; color: #0c0928;">
                                                Confirm Your Email Address</div>

                                            <div>&nbsp;</div>

                                            <div>&nbsp;</div>

                                            <div
                                                style="font-size: 16px; line-height:1.4; letter-spacing: 0px; font-family: 'Roboto', sans-serif; color: #082446;">
                                                Thank you for joining Arctic Travels!</div>

                                            <div>&nbsp;</div>

                                            <div
                                                style="font-size: 16px; line-height:1.4; letter-spacing: 0px; font-family: 'Roboto', sans-serif; color: #082446;">
                                                To finish signing up, please confirm your email address. This
                                                ensures we have the right email incase we need to contact you.
                                            </div>

                                            <div>&nbsp;</div>
                                            <div>&nbsp;</div>

                                            <div>
                                                <a href=${url}>
                                                    <button
                                                        style="background: #302b63; color: #ffffff; padding:10px 20px; border-radius: 5px; cursor: pointer; font-size: 17px;">Confirm
                                                        email address</button>
                                                </a>
                                            </div>
                                            <div>&nbsp;</div>
                                            <div
                                                style="font-size: 16px; line-height:1.4;  letter-spacing: 0px; font-family: 'Roboto', sans-serif; color: #031429;">
                                                Or Scan the QR code below to continue</div>
                                            <div>&nbsp;</div>
                                            <div style="width: 200px;">
                                                <img style="width: 100px;"
                                                    src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${url}"
                                                    alt="qr-data" />
                                            </div> 
                                            </td>
                                    </tr>
                                    <tr>
                                        <td align="center" bgcolor="#FFFFFF" width="460">
                                            <div>&nbsp;</div>
                                            <div
                                                style="font-size: 12px; line-height:1.4; font-style: italic; letter-spacing: 0px; font-family: 'Roboto', sans-serif; color: #031429;">
                                                Copyright @2022</div>
                                            <div
                                                style="font-size: 12px; line-height:1.4; font-style: italic; letter-spacing: 0px; font-family: 'Roboto', sans-serif; color: #031021;">
                                                All rights reserved Arctic Travels
                                            </div>
                                            <div
                                                style="font-size: 12px; line-height:1.4; font-style: italic; letter-spacing: 0px; font-family: 'Roboto', sans-serif; color: #031226;">
                                                Designed by <a style="color: #031226;"
                                                    href="https://github.com/Em-codes">em_codes</a>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div>&nbsp;</div>
                            <div>&nbsp;</div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div>&nbsp;</div>
            <div>&nbsp;</div>
        </td>
    </tr>
</tbody>
</table>
`

module.exports = confirmEmailMessage;