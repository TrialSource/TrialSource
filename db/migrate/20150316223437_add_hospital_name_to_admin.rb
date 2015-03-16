class AddHospitalNameToAdmin < ActiveRecord::Migration
  def change
  	add_column :administrators, :hospital_name, :string
  end
end
