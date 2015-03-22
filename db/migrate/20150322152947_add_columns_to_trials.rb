class AddColumnsToTrials < ActiveRecord::Migration
  def change
    add_column :trials, :primary_contact_email, :string
    add_column :trials, :principal, :string
  end
end
