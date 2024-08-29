import { useForm } from "react-hook-form"
import { useMemberInfo } from "../../hooks/useMemberInfo"
import { useUpdateMember } from "../../hooks/useUpdateMember"
import { useEffect } from "react"
import { formatDate, formatDateForInput } from "../../utils/helpers"
formatDate
const MemberDetail = () => {
  const {
    mutate: updateMember,
    isLoading: LoadingUpdate,
    error: updateErr,
  } = useUpdateMember()

  const { data: member, isLoading, error } = useMemberInfo()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (member) {
      setValue("firstName", member.name.charAt(0) || "")
      setValue("lastName", member.name.slice(1) || "")
      setValue("phone", member.phone || "")
      setValue("email", member.email || "")
      setValue("address", member.address || "")
      setValue("birth", member.birth ? formatDateForInput(member.birth) : "")
    }
  }, [member, setValue])

  if (isLoading) return <div>Loading...</div>
  console.log(member.birth)

  const onSubmit = (data) => {
    const name = data.firstName + data.lastName
    const updatedData = {
      ...data,
      name,
    }
    delete updatedData.firstName
    delete updatedData.lastName

    updateMember(updatedData)
  }
  console.log(member)
  return (
    <div id="accountInfoContent">
      <form className="accountInfo-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-row">
          <div className="form-col">
            <label htmlFor="memberSurname">姓氏</label>
            <input
              type="text"
              className={`memberInput-field ${
                errors.firstName ? "memberInputError" : ""
              }`}
              id="memberSurname"
              {...register("firstName", {
                required: "* 請 輸 入 姓 氏",
              })}
            />
            {errors.firstName && (
              <p className="memberInputError-message">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="form-col">
            <label htmlFor="memberGivenName">名字</label>
            <input
              type="text"
              className={`memberInput-field ${
                errors.lastName ? "memberInputError" : ""
              }`}
              id="memberGivenName"
              {...register("lastName", {
                required: "* 請 輸 入 名 字",
              })}
            />
            {errors.lastName && (
              <p className="memberInputError-message">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label htmlFor="memberPhone">電話號碼</label>
            <input
              type="tel"
              className={`memberInput-field ${
                errors.phone ? "memberInputError" : ""
              }`}
              id="memberPhone"
              {...register("phone", {
                required: "* 請 輸 入 電 話 號 碼",
              })}
            />
            {errors.phone && (
              <p className="memberInputError-message">{errors.phone.message}</p>
            )}
          </div>
          <div className="form-col">
            <label htmlFor="memberEmail">電子郵件</label>
            <input
              type="email"
              className={`memberInput-field ${
                errors.email ? "memberInputError" : ""
              }`}
              id="memberEmail"
              {...register("email", {
                required: "* 請 輸 入 電 子 郵 件",
              })}
            />
            {errors.email && (
              <p className="memberInputError-message">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <label htmlFor="memberAddress">居住地</label>
            <input
              type="text"
              className={`memberInput-field ${
                errors.address ? "memberInputError" : ""
              }`}
              id="memberAddress"
              {...register("address", {
                required: "* 請 輸 入 居 住 地",
              })}
            />
            {errors.address && (
              <p className="memberInputError-message">
                {errors.address.message}
              </p>
            )}
          </div>
          <div className="form-col">
            <label htmlFor="memberBirth">生日</label>
            <input
              type="date"
              className={`memberInput-field ${
                errors.birth ? "memberInputError" : ""
              }`}
              id="memberBirth"
              {...register("birth", {
                required: "* 請 輸 入 生 日",
              })}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn">
          確認更改
        </button>
      </form>
    </div>
  )
}

export default MemberDetail
