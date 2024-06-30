import React from 'react';
import Label from '../../../../components/label/labelV2/Label';
const PersonalDetailsOfPhysician = ({ data }) => {
   
    return (
        <div>
            {data?.practiceAddress && (
                <div>
                    <Label>Practice Address</Label>
                    <p>
                        {data?.practiceAddress?.addressLine1 +
                            ' ' +
                            data?.practiceAddress?.addressLine2 +
                            ' , ' +
                            data?.practiceAddress?.city +
                            ' , ' +
                            data?.practiceAddress?.state +
                            ' , ' +
                            data?.practiceAddress?.country +
                            ' , ' +
                            data?.practiceAddress?.pinCode}
                    </p>
                </div>
            )}
            {data?.billingAddress && (
                <div>
                    <Label>Billing Address</Label>
                    <p>
                        {data?.billingAddress?.addressLine1 +
                            ' ' +
                            data?.billingAddress?.addressLine2 +
                            ' , ' +
                            data?.billingAddress?.city +
                            ' , ' +
                            data?.billingAddress?.state +
                            ' , ' +
                            data?.billingAddress?.country +
                            ' , ' +
                            data?.billingAddress?.pinCode}
                    </p>
                </div>
            )}

        </div>
    );
};

export default PersonalDetailsOfPhysician;
