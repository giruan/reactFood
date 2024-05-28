import { useEffect, useState } from "react";


function SignUp() {
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);

  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setAgeCheck(true);
      setUseCheck(true);
      setMarketingCheck(true);
    } else {
      setAllCheck(false);
      setAgeCheck(false);
      setUseCheck(false);
      setMarketingCheck(false);
    }
  };

  const ageBtnEvent = () => {
    setAgeCheck(!ageCheck);
  };

  const useBtnEvent = () => {
    setUseCheck(!useCheck);
  };

  const marketingBtnEvent = () => {
    setMarketingCheck(!marketingCheck);
  };

  useEffect(() => {
    if (ageCheck === true && useCheck === true && marketingCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [ageCheck, useCheck, marketingCheck]);

  return (
    <>
      <form method="post" action="" >
        <div >
          <label >
            약관동의
          </label>
          <div >
            <div >
              <input type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent} />
              <label htmlFor="all-check">전체동의</label>
            </div>
            <div >
             
            </div>
            <div >
              
            </div>
            <div >
              
            </div>
          </div>
        </div>
        <button type="submit">
          동의
        </button>
      </form>
    </>
  );
}

export default SignUp;