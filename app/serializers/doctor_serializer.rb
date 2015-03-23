class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name
  has_one :organization
  has_one :login
end
