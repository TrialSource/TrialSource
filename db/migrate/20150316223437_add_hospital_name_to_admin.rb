class AddHospitalNameToAdmin < ActiveRecord::Migration
  def change
  	add_column :admins, :hospital_name, :string
  end
end
