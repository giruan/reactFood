import { Link } from 'react-router-dom';
import '../styles/join.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Join() {
  const navigate = useNavigate();

  // 이메일 정규식
  const validateEmail = (email) => {
    var re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  // 패스워드 정규식
  const passwordRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()`])[a-z\d!@#$%^&*()`]{8,}$/;

  // Id 중복 확인
  const [isIdValidated, setIsIdValidated] = useState(false);

  // phone 중복 확인
  const [isPhoneValidated, setIsPhoneValidated] = useState(false);

  // email 정규식 확인
  const [emailValidationMessage, setEmailValidationMessage] = useState('');

  // password 중복확인
  const [passwordValidationMessage, setPasswordValidationMessage] = useState('');

  // phone 정규식
  const [phoneValidationMessage, setPhoneValidationMessage] = useState('');

  // 비밀번호 재확인
  const [rePasswordValidationMessage, setRePasswordValidationMessage] = useState('');
  const [previewSrc, setPreviewSrc] = useState('');

  // 폼 입력 상태 관리
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [birthNum, setBirthNum] = useState('');
  const [address, setAdderss] = useState('');
  const [phone, setPhone] = useState('');

  // 회원가입 동의 체크박스 
  const [allCheck, setAllCheck] = useState(false);
  const [ageCheck, setAgeCheck] = useState(false);
  const [useCheck, setUseCheck] = useState(false);
  const [marketingCheck, setMarketingCheck] = useState(false);




  const [imgUrl, setImgUrl] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'birthNum':
        setBirthNum(value);
        break;
      case 'address':
        setAdderss(value);
        break;
      default:
        break;
    }
  };

  // 폼 제출을 처리하는 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // formData 인스턴스 생성
    const formData = new FormData();

    // 기존 데이터 추가
    formData.append('userId', userId);
    formData.append('password', password);
    formData.append('name', name);
    formData.append('birthNum', birthNum);
    formData.append('address', address);
    formData.append('phone', phone);

    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput.files[0]) {
      formData.append('imgUrl', fileInput.files[0]);
    }
    fetch('/join', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // 서버로부터의 응답 처리
        Swal.fire({
          position: "center",
          icon: "success",
          title: "환영합니다!",
          text : "회원가입 되었습니다!",
          showConfirmButton: false,
          timer: 2000,
        }) 
        setTimeout(() => {
          window.location.href = '/login'
        }, 2000);
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "회원가입 실패!",
          text: "올바르지 않은 정보가 입력 되었습니다.",
        });
        console.error('Error:', error);
      });
  };

  // userId 중복 검사
  const handleUserIdChange = (e) => {
    const userIdValue = e.target.value;
    setUserId(userIdValue);

    fetch('/checkId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId: userIdValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (!validateEmail(userIdValue)) {
          setEmailValidationMessage('올바르지 않은 아이디 형식입니다.');
          setIsIdValidated(false);
        } else if (data.exists) {
          setEmailValidationMessage('중복된 아이디입니다.');setIsIdValidated(false);
        } else if (!data.exists && validateEmail(userIdValue)) {
          setEmailValidationMessage('사용 가능한 아이디입니다.');
          setIsIdValidated(true);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('서버 오류가 발생했습니다.');
      });
  };

  // 비밀번호 유효성 검사
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    if (passwordRegex.test(newPassword)) {
      setPasswordValidationMessage('사용 가능한 비밀번호입니다.');
      // 여기서 추가적인 상태 변경이 필요하면 수행합니다.
    } else {
      setPasswordValidationMessage('비밀번호는 최소 8자 이상이어야 하며, 숫자, 소문자, 특수문자를 포함해야 합니다.');
    }
  };

  // 비밀번호 재확인
  const handleRePasswordChange = (e) => {
    setRePassword(e.target.value);
    if (password === e.target.value) {
      setRePasswordValidationMessage('비밀번호가 일치합니다.');
    } else {
      setRePasswordValidationMessage('비밀번호가 일치하지 않습니다.');
    }
  };

  // 회원가입 버튼 눌렀을시 이벤트
  const handleJoinClick = (e) => {
    e.preventDefault();
    if (isIdValidated && isPhoneValidated &&passwordRegex.test(password) && rePassword == password && birthNum && address && phone && name && ageCheck && useCheck) {
      
      handleSubmit(e);
    } else if (!isIdValidated && passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "회원가입 실패!",
        text: "아이디를 규칙에 맞게 입력 해주세요...",
      });
      return;
    } else if (isIdValidated && !passwordRegex.test(password)) {
      Swal.fire({
        icon: "error",
        title: "회원가입 실패!",
        text: "비밀번호를 규칙에 맞게 입력 해주세요...",
      });
      return;
    } 
    else if(!isIdValidated && !passwordRegex.test(password)){
      Swal.fire({
        icon: "error",
        title: "회원가입 실패!",
        text: "아이디와 비밀번호를 입력해주세요...",
      });
      return;
    }
    else if(!name || !birthNum || !address || !phone){
      Swal.fire({
        icon: "error",
        title: "회원가입 실패!",
        text: "필수 항목들을 전부 입력해주세요...",
      });
      return;
    }
    else if(!ageCheck || !useCheck){
      Swal.fire({
        icon: "error",
        title: "회원가입 실패!",
        text: "약관 동의를 클릭해주세요...",
      });
      return;
    }
    
  };

  // 사진 변경
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreviewSrc(reader.result);
      };

      reader.readAsDataURL(file);
    }
  };

  

  // 휴대폰 번호 제약조건
  const handlePhoneChange = async (e) => {
    let value = e.target.value.replace(/\D/g, ''); // 숫자가 아닌 모든 문자를 제거
    
    if (value.length > 11) {
      value = value.slice(0, 11); // 최대 11자리로 제한
    }
    let formattedValue = value;
    if (formattedValue.length > 3 && formattedValue.length <= 7) {
      formattedValue = value.replace(/(\d{3})(\d{1,4})/, '$1-$2');
    } else if (formattedValue.length > 7) {
      formattedValue = formattedValue.replace(/(\d{3})(\d{3,4})(\d{1,4})/, '$1-$2-$3');
    }

    fetch('/checkPhone', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ phone: formattedValue }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.exists && phone.length == 12) { 
          setPhoneValidationMessage('다른 전화번호를 사용해주세요.')
          setIsPhoneValidated(false);
        } else if (!data.exists && phone.length == 12) {
          setPhoneValidationMessage('사용 가능한 전화번호입니다.')
          setIsPhoneValidated(true);
        }
        else if(phone.length > 0){
          setPhoneValidationMessage('전화번호를 입력해주세요.')
          setIsPhoneValidated(false);
        } 
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('서버 오류가 발생했습니다.');
      });
      setPhone(formattedValue);
  };
  

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
    <div className="joinContainer">
      <header>
        <div className="header_login">
          <Link to="/">
            <img src="/image/logo.PNG" alt="YumYard"></img>
          </Link>
        </div>
      </header>

      <div className="contaier joinPage">
        <div className="jointitle">
          <h2>신규 회원가입</h2>
        </div>
        <form id="form-box">
          <div className="joinForm">
            <div className="joinItem">
              <strong>
                아이디{' '}
                <span className="essential" title="필수 항목입니다.">
                  *
                </span>
              </strong>
              <div className="idCheck">
                <input name="userId" type="text" placeholder="example@example.com" onChange={handleUserIdChange} />
              </div>
              <div
                id="userIdValidation"
                className={emailValidationMessage === '사용 가능한 아이디입니다.' ? 'valid' : 'invalid'}
              >
                {emailValidationMessage}
              </div>
            </div>
            <div className="joinItem">
              <strong>
                비밀번호{' '}
                <span title="필수 항목입니다." className="essential">
                  *
                </span>
              </strong>
              <input name="password" type="password" placeholder="비밀번호" onChange={handlePasswordChange} />
              <div
                id="passwordValidation"
                className={passwordValidationMessage === '사용 가능한 비밀번호입니다.' ? 'valid' : 'invalid'}
              >
                {passwordValidationMessage}
              </div>
            </div>
            <div className="joinItem">
              <strong>
                비밀번호 재확인{' '}
                <span className="essential" title="필수 항목입니다.">
                  *
                </span>
              </strong>
              <input
                name="rePassword"
                type="password"
                placeholder="비밀번호 재확인"
                onChange={handleRePasswordChange}
              />
              <div
                id="rePasswordValidation"
                className={rePasswordValidationMessage === '비밀번호가 일치합니다.' ? 'valid' : 'invalid'}
              >
                {rePasswordValidationMessage}
              </div>
            </div>
            <div className="joinItem">
              <strong>
                이름{' '}
                <span title="필수 항목입니다." className="essential">
                  *
                </span>
              </strong>
              <input name="name" type="text" placeholder="이름" onChange={handleInputChange} />
            </div>
            <div className="joinItem">
              <strong>
                생년월일{' '}
                <span title="필수 항목입니다." className="essential">
                  *
                </span>
              </strong>
              <input name="birthNum" type="date" onChange={handleInputChange} />
            </div>
            <div className="joinItem">
              <strong>
                주소{' '}
                <span title="필수 항목입니다." className="essential">
                  *
                </span>
              </strong>
              <input name="address" type="text" placeholder="주소" onChange={handleInputChange} />
            </div>
            <div className="joinItem ">
              <strong>
                휴대폰{' '}
                <span title="필수 항목입니다." className="essential">
                  *
                </span>
              </strong>
              <div className="phoneReg">
                <input name="phone" type="text" placeholder="전화번호" onChange={handlePhoneChange} value={phone} />
                <button type="button">인증번호발송</button>
              </div>
              <div
                id="phoneValidation"
                className={phoneValidationMessage === '사용 가능한 비밀번호입니다.' ? 'valid' : 'invalid'}
              >
                {phoneValidationMessage}
              </div>
            </div>
            <br />

            {/* 이미지 선택 서버에서 upload가 single로 되어있어서 한 개만 설정됨.*/}
            <div className="joinItem row align-items-center">
              <div className="col picCheck">
                <strong className="col">프로필 사진 (선택) :</strong>
                <input name="imgUrl" type="file" className="form-control-file" onChange={handleImageChange} />
                {/* 이미지 미리보기 */}
                {previewSrc && (
                  <div className="col-12 picPreview">
                    <img
                      id="preview"
                      src={previewSrc}
                      alt="Preview"
                      style={{ maxWidth: '400px', maxHeight: '500px' }}
                    />
                    {/* 삭제 버튼 */}
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        setPreviewSrc('');
                        const fileInput = document.querySelector('input[type="file"]');
                        fileInput.value = '';
                      }}
                    >
                      ✖
                    </button>
                  </div>
                )}
              </div>
            </div>


           <div className="terms">
 
            {/* 이용약관 동의 */}
            <div className="joinItem">
              <input type="checkbox" id="all-check" checked={allCheck} onChange={allBtnEvent} />
              <label htmlFor="all-check">전체동의</label>
            </div>          
            
            <div className="joinItem">
              <input type="checkbox" id="check1" checked={ageCheck} onChange={ageBtnEvent} />
              <label htmlFor="check1">만 14세 이상입니다 <span className='essential'>(필수)</span></label>
            </div>                   
            
            <div className="joinItem">
              <input type="checkbox" id="check2" checked={useCheck} onChange={useBtnEvent} />
              <label htmlFor="check2">이용약관 <span className='essential'>(필수)</span></label>
            </div>  

            <div className="joinItem">
              <input type="checkbox" id="check3" checked={marketingCheck} onChange={marketingBtnEvent} />
              <label htmlFor="check3">마케팅 동의 <span >(선택)</span></label>
            </div>  
           </div>

            {/* 회원가입 버튼 */}
            <div className="joinBtn" id="joinBtn">
              <button type="submit" className="btn btn-dark loginButton" onClick={handleJoinClick}>
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Join;
