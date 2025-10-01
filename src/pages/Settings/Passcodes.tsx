import { CodeType, usePasscode } from '@/pages/Settings/usePasscode';
import { useTranslations } from '@/shared/hooks/useTranslations';
import Button from '@/shared/ui/Button';
import Icon from '@/shared/ui/Icon';
import Input from '@/shared/ui/Input';
import Tooltip from '@/shared/ui/Tooltip';

const Passcodes = () => {
  const { t } = useTranslations();

  const {
    loginCode,
    safetyCode,
    loginExist,
    safetyFieldDisabled,
    loginResetDisabled,
    safetyResetDisabled,
    showSafetyCodeError,
    handleChange,
    saveLoginPasscode,
    saveSafetyPasscode,
    resetLoginPasscode,
    resetSafetyPasscode
  } = usePasscode();

  const renderPasscode = (type: CodeType, value: string) => {
    const titleKey = type === 'loginCode' ? 'setup_passcode' : 'setup_safety_passcode';
    const tooltipKey = type === 'loginCode' ? 'setup_passcode_tooltip' : 'safety_passcode_tooltip';
    const safetyPlaceholderKey = loginExist ? 'enter_passcode' : 'safety_no_login_placeholder';
    const inputDisabled = type === 'loginCode' ? false : safetyFieldDisabled;
    const saveDisabled = type === 'loginCode' ? !loginCode : !safetyCode;
    const resetDisabled = type === 'loginCode' ? loginResetDisabled : safetyResetDisabled;
    const save = type === 'loginCode' ? saveLoginPasscode : saveSafetyPasscode;
    const reset = type === 'loginCode' ? resetLoginPasscode : resetSafetyPasscode;

    return (
      <div>
        <div className="flex">
          <span>{t(titleKey)}</span>
          <Tooltip className="ml-2" text={t(tooltipKey)}>
            <Icon name="info" />
          </Tooltip>
        </div>

        <div className="flex mt-2 gap-2 max-lg:flex-col">
          <div className="flex flex-col">
            <Input
              type="password"
              className="w-[350px]"
              value={value}
              placeholder={t(type === 'loginCode' ? 'enter_passcode' : safetyPlaceholderKey)}
              disabled={inputDisabled}
              onChange={(newValue) => handleChange(type, newValue)}
            />
            {type === 'safetyCode' && (
              <div className="h-4">
                {showSafetyCodeError && (
                  <span className="text-sm text-text-error">{t('safety_code_error')}</span>
                )}
              </div>
            )}
          </div>

          <Button type="add" disabled={saveDisabled} onClick={save}>
            {t('save')}
          </Button>

          <Button disabled={resetDisabled} onClick={reset}>
            {t('reset_passcode')}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <>
      {renderPasscode('loginCode', loginCode)}
      {renderPasscode('safetyCode', safetyCode)}
    </>
  );
};

export default Passcodes;
