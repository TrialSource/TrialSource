class DoctorSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :admin_id
end
