select
    id,
    name,
    legal_name as "legalName",
    telephone,
    fax_number as "faxNumber",
    email,
    description,
    url,
    vat_id as "vatId",
    tax_id as "taxId",
    bankgiro,
    plusgiro,
    json_build_object(
      'building', (address).building,
      'area', (address).area,
      'street', (address).street,
      'postalCode', (address).postal_code,
      'locality', (address).locality,
      'region', (address).region,
      'country', (address).country
    ) as address
  from organizations limit 1;
