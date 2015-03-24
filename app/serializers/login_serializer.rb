class LoginSerializer < ActiveModel::Serializer
  attributes :id, :email, :user_id
end
