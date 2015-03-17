class AddColumnsToDoctors < ActiveRecord::Migration
  def change
  	add_column :doctors, :first_name, :string
  	add_column :doctors, :last_name, :string
    add_column :doctors, :admin_id, :integer
  end
end
